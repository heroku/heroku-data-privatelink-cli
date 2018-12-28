import {expect, test} from '../../test'

describe('endpoints:create', () => {
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
      .delete('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkListResponse)
    )
    .stderr()
    .stdout()
    .command(['endpoints:destroy', 'postgres-123', '--app', 'myapp'])
    .it('destroys a trusted VPC endpoint', ctx => {
      expect(ctx.stderr).to.contain('Destroying Trusted VPC Endpoint... done')
    })
})
