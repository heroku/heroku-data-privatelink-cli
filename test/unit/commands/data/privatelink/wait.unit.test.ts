import {stdout} from 'stdout-stderr'
import Cmd from '../../../../../src/commands/data/privatelink/index'
import runCommand from '../../../../helpers/runCommand'
import {expect} from 'chai'
import {addonsFetcherResponse} from '../../../../fixtures'
import * as nock from 'nock'
import heredoc from 'tsheredoc'

describe('data:privatelink:wait', function () {
  const privateLinkListResponse = {
    app: {name: 'myapp'},
    addon: {name: 'postgres-123'},
    status: 'Operational',
    service_name: 'com.amazonaws.vpce.testvpc',
    connections: [],
    allowed_accounts: [],
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

  it('waits for a privatelink endpoint to be provisioned', async function () {
    shogun
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkListResponse)
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

      Your privatelink endpoint is now operational.
      You must now copy the Service Name and follow the rest of the steps listed in https://devcenter.heroku.com/articles/heroku-postgres-via-privatelink
    `)
  })
})
