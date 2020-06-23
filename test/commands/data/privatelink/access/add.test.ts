import {addonsFetcherResponse} from '../../../../fixtures'
import {expect, test} from '../../../../test'

describe('data:privatelink:access:add', () => {
  test
    .nock('https://postgres-api.heroku.com', api => api
      .put('/private-link/v0/databases/postgres-123/whitelisted_accounts', {whitelisted_accounts: ['123456789012:root']})
      .reply(200, {})
    )
    .nock('https://api.heroku.com', api => api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)
    )
    .stdout()
    .stderr()
    .command(['data:privatelink:access:add', 'postgres-123', '--aws-account-id', '123456789012:root', '--app', 'myapp'])
    .it('adds an allowed account', ctx => {
      expect(ctx.stderr).to.contain('Adding account... done')
    })

  test
    .nock('https://postgres-api.heroku.com', api => api
      .put('/private-link/v0/databases/postgres-123/whitelisted_accounts', {whitelisted_accounts: ['123456789012:resource1', '123456789012:resource2']})
      .reply(200, {})
    )
    .nock('https://api.heroku.com', api => api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)
    )
    .stdout()
    .stderr()
    .command(['data:privatelink:access:add', 'postgres-123', '--aws-account-id', '123456789012:resource1', '--aws-account-id', '123456789012:resource2', '--app', 'myapp'])
    .it('adds multiple allowed accounts', ctx => {
      expect(ctx.stderr).to.contain('Adding accounts... done')
    })
})
