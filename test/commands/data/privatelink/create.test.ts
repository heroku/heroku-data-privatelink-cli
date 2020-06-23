import {addonsFetcherResponse} from '../../../fixtures'
import {expect, test} from '../../../test'

describe('data:privatelink:create', () => {
  test
    .nock('https://postgres-api.heroku.com', api => api
      .post('/private-link/v0/databases/postgres-123', {allowlisted_accounts: ['123456789012:root']})
      .reply(200, {})
    )
    .nock('https://api.heroku.com', api => api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)
    )
    .stderr()
    .stdout()
    .command(['data:privatelink:create', 'postgres-123', '--aws-account-id', '123456789012:root', '--app', 'myapp'])
    .it('creates a privatelink endpoint with one account id', ctx => {
      expect(ctx.stderr).to.contain('Creating privatelink endpoint... done')
    })

  test
    .nock('https://postgres-api.heroku.com', api => api
      .post('/private-link/v0/databases/postgres-123', {allowlisted_accounts: ['123456789012:resource1', '123456789012:resource2']})
      .reply(200, {})
    )
    .nock('https://api.heroku.com', api => api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)
    )
    .stderr()
    .stdout()
    .command(['data:privatelink:create', 'postgres-123', '--aws-account-id', '123456789012:resource1', '--aws-account-id', '123456789012:resource2', '--app', 'myapp'])
    .it('creates a privatelink endpoint with multiple account ids', ctx => {
      expect(ctx.stderr).to.contain('Creating privatelink endpoint... done')
      expect(ctx.stdout).to.contain('Run heroku data:privatelink:wait postgres-123 --app myapp to check the creation process.')
    })
})
