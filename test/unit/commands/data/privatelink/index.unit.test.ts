import {stdout} from 'stdout-stderr'
import Cmd from '../../../../../src/commands/data/privatelink/index'
import runCommand from '../../../../helpers/runCommand'
import {expect} from 'chai'
import {
  addonsFetcherResponse,
  privateLinkNewlyCreated,
  privateLinkWithConnections,
} from '../../../../fixtures'
import * as nock from 'nock'
import heredoc from 'tsheredoc'

describe('data:privatelink', function () {
  let api: nock.Scope
  let shogun: nock.Scope

  beforeEach(function () {
    api = nock('https://api.heroku.com')
    shogun = nock('https://api.data.heroku.com')
  })

  afterEach(function () {
    api.done()
    shogun.done()
    nock.cleanAll()
  })

  it('shows the status of a privatelink endpoint, including allowed accounts and connections', async function () {
    shogun
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkWithConnections)
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    await runCommand(Cmd, [
      'postgres-123',
      '--app',
      'myapp',
    ])

    expect(stdout.output).to.eq(heredoc`
      === privatelink endpoint status for postgres-123

      Service Name: com.amazonaws.vpce.testvpc
      Status:       Operational

      === Allowed Accounts

       ARN                           Status 
       ───────────────────────────── ────── 
       arn:aws:iam::12345567890:root Active 

      === Connections

       Endpoint ID Owner ARN                     Status    
       ─────────── ───────────────────────────── ───────── 
       123456      arn:aws:iam::12345567890:root Available 
    `)
  })

  it('tells the user to run heroku data:privatelink:wait for a newly created endpoint', async function () {
    shogun
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkNewlyCreated)
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    await runCommand(Cmd, [
      'postgres-123',
      '--app',
      'myapp',
    ])

    expect(stdout.output).to.eq(heredoc`

      The privatelink endpoint is now being provisioned for postgres-123.
      Run heroku data:privatelink:wait -a myapp to check the creation process.
    `)
  })
})
