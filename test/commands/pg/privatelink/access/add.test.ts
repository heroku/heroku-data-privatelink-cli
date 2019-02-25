import {addonsFetcherResponse} from '../../../../fixtures'
import {expect, test} from '../../../../test'

describe('pg:privatelink:access:add', () => {
  test
    .nock('https://postgres-api.heroku.com', api => api
      .put('/private-link/v0/databases/postgres-123/whitelisted_accounts', {whitelisted_accounts: ['123456789012:root']})
      .reply(200, {})
    )
    .nock('https://api.heroku.com', api => api
      .post('/actions/addon-attachments/resolve')
      .reply(200, addonsFetcherResponse)
    )
    .stdout()
    .stderr()
    .command(['pg:privatelink:access:add', 'postgres-123', '--aws-account-id', '123456789012:root', '--app', 'myapp'])
    .it('adds an account to the whitelist', ctx => {
      expect(ctx.stderr).to.contain('Adding account to the whitelist... done')
    })

  test
    .nock('https://postgres-api.heroku.com', api => api
      .put('/private-link/v0/databases/postgres-123/whitelisted_accounts', {whitelisted_accounts: ['123456789012:resource1', '123456789012:resource2']})
      .reply(200, {})
    )
    .nock('https://api.heroku.com', api => api
      .post('/actions/addon-attachments/resolve')
      .reply(200, addonsFetcherResponse)
    )
    .stdout()
    .stderr()
    .command(['pg:privatelink:access:add', 'postgres-123', '--aws-account-id', '123456789012:resource1', '--aws-account-id', '123456789012:resource2', '--app', 'myapp'])
    .it('adds multiple accounts to the whitelist', ctx => {
      expect(ctx.stderr).to.contain('Adding accounts to the whitelist... done')
    })
})
