import {expect, test} from '../../test'

describe('endpoints', () => {
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
    .stdout()
    .stderr()
    .command(['endpoints:wait', 'postgres-123', '--app', 'myapp'])
    .it('waits for a trusted VPC endpoint to be provisioned', ctx => {
      expect(ctx.stderr).to.contain('Waiting for the Trusted VPC Endpoint to be provisioned... done')
    })
})
