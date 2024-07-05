import {stdout} from 'stdout-stderr'
import Cmd from '../../../../../../src/commands/data/privatelink/access/index'
import runCommand from '../../../../../helpers/runCommand'
import {expect} from 'chai'
import {addonsFetcherResponse} from '../../../../../fixtures'
import * as nock from 'nock'
import heredoc from 'tsheredoc'

describe('data:privatelink:access', function () {
  const privateLinkAllowlistResponse = {
    app: {name: 'myapp'},
    addon: {name: 'postgres-123'},
    status: 'Operational',
    service_name: 'com.amazonaws.vpce.testvpc"',
    connections: [],
    allowed_accounts: [{arn: 'arn:aws:iam::123456789:root', status: 'Available'}],
  }
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

  it('shows all allowed accounts', async function () {
    shogun
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkAllowlistResponse)
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    await runCommand(Cmd, [
      'postgres-123',
      '--app',
      'myapp',
    ])

    expect(heredoc(stdout.output)).to.eq(heredoc`
      ARN                         Status    
      ─────────────────────────── ───────── 
      arn:aws:iam::123456789:root Available 
    `)
  })
})
