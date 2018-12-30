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
    .command(['endpoints', 'postgres-123', '--app', 'myapp'])
    .it('shows the status of a trusted VPC endpoint', ctx => {
      expect(ctx.stdout).to.contain('=== Trusted VPC Endpoints for postgres-123')
      expect(ctx.stdout).to.contain('Service Name:         com.amazonaws.vpce.testvpc')
      expect(ctx.stdout).to.contain('Status:               Operational')
      expect(ctx.stdout).to.contain('Currently there are no active connections for your Trusted VPC Endpoint.')
      expect(ctx.stdout).to.contain('Please follow these instructions(https://devcenter.heroku.com/articles/endpoints) to fully setup your endpoint.')
    })
})
