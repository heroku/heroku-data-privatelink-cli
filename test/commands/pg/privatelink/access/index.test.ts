import {addonsFetcherResponse} from '../../../../fixtures'
import {expect, test} from '../../../../test'

describe('pg:privatelink:access', () => {
  const privateLinkWhitelistResponse = {
    app: {name: 'myapp'},
    addon: {name: 'postgres-123'},
    status: 'Operational',
    service_name: 'com.amazonaws.vpce.testvpc"',
    connections: [],
    whitelisted_accounts: [{arn: 'arn:aws:iam::123456789:root', status: 'Available'}]
  }

  test
    .nock('https://postgres-api.heroku.com', api => api
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkWhitelistResponse)
    )
    .nock('https://api.heroku.com', api => api
      .post('/actions/addon-attachments/resolve')
      .reply(200, addonsFetcherResponse)
    )
    .stdout()
    .stderr()
    .command(['pg:privatelink:access', 'postgres-123', '--app', 'myapp'])
    .it('shows all accounts in the whitelist', ctx => {
      expect(ctx.stdout).to.contain('ARN                         Status')
      expect(ctx.stdout).to.contain('arn:aws:iam::123456789:root Available')
    })
})
