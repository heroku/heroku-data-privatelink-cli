import {addonsFetcherResponse} from '../../../fixtures'
import {expect, test} from '../../../test'

describe('pg:privatelink:wait', () => {
  const privateLinkListResponse = {
    app: {name: 'myapp'},
    addon: {name: 'postgres-123'},
    status: 'Operational',
    service_name: 'com.amazonaws.vpce.testvpc"',
    connections: [],
    whitelisted_accounts: []
  }

  test
    .nock('https://postgres-api.heroku.com', api => api
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkListResponse)
    )
    .nock('https://api.heroku.com', api => api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)
    )
    .stdout()
    .stderr()
    .command(['pg:privatelink:wait', 'postgres-123', '--app', 'myapp'])
    .it('waits for a privatelink endpoint to be provisioned', ctx => {
      expect(ctx.stderr).to.contain('Waiting for the privatelink endpoint to be provisioned... done')
    })
})
