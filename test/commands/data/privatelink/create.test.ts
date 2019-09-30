import {addonsFetcherResponse, addonsFetcherShieldResponse, addonsInfo, addonsShieldInfo} from '../../../fixtures'
import {expect, test} from '../../../test'

describe('data:privatelink:create', () => {
  test
    .nock('https://postgres-api.heroku.com', api => api
      .post('/private-link/v0/databases/postgres-123', {whitelisted_accounts: ['123456789012:root']})
      .reply(200, {})
    )
    .nock('https://api.heroku.com', api => api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)
    )
    .nock('https://api.heroku.com', api => api
      .get('/apps/myapp/addons/postgres-123')
      .reply(200, addonsInfo)
    )
    .stderr()
    .stdout()
    .command(['data:privatelink:create', 'postgres-123', '--aws-account-id', '123456789012:root', '--app', 'myapp'])
    .it('creates a privatelink endpoint with one account id', ctx => {
      expect(ctx.stderr).to.contain('Creating privatelink endpoint... done')
    })

  test
    .nock('https://postgres-api.heroku.com', api => api
      .post('/private-link/v0/databases/postgres-123', {whitelisted_accounts: ['123456789012:resource1', '123456789012:resource2']})
      .reply(200, {})
    )
    .nock('https://api.heroku.com', api => api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)
    )
    .nock('https://api.heroku.com', api => api
      .get('/apps/myapp/addons/postgres-123')
      .reply(200, addonsInfo)
    )
    .stderr()
    .stdout()
    .command(['data:privatelink:create', 'postgres-123', '--aws-account-id', '123456789012:resource1', '--aws-account-id', '123456789012:resource2', '--app', 'myapp'])
    .it('creates a privatelink endpoint with multiple account ids', ctx => {
      expect(ctx.stderr).to.contain('Creating privatelink endpoint... done')
    })

  test
    .nock('https://api.heroku.com', api => api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherShieldResponse)
    )
    .nock('https://postgres-api.heroku.com', api => api
      .post('/private-link/v0/databases/postgres-123', {whitelisted_accounts: ['123456789012:resource1']})
      .reply(200, {})
    )
    .nock('https://api.heroku.com', api => api
      .get('/apps/myapp/addons/postgres-123')
      .reply(200, addonsShieldInfo)
    )
    .stderr()
    .stdout()
    .stdin('I agree', 2000)
    .command(['data:privatelink:create', 'postgres-123', '--aws-account-id', '123456789012:resource1', '--app', 'myapp'])
    .it('creates a privatelink endpoint with on shield databases', ctx => {
      expect(ctx.stderr).to.contain('This feature allows access from outside of your Shield Private Space and may reduce your security. Do you agree to these risks? Type \'I agree\'')
      expect(ctx.stderr).to.contain('Creating privatelink endpoint... done')
    })
})
