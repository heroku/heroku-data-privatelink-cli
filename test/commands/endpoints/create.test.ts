import {expect, test} from '../../test'

describe('endpoints:create', () => {
  test
    .nock('https://postgres-api.heroku.com', api => api
      .post('/private-link/v0/databases/postgres-123', {whitelisted_accounts: ['123456789012:root']})
      .reply(200, {})
    )
    .stderr()
    .stdout()
    .command(['endpoints:create', 'postgres-123', '--account-id', '123456789012:root', '--app', 'myapp'])
    .it('creates a trusted VPC endpoint with one account id', ctx => {
      expect(ctx.stderr).to.contain('Creating Trusted VPC Endpoint... done')
    })

  test
    .nock('https://postgres-api.heroku.com', api => api
      .post('/private-link/v0/databases/postgres-123', {whitelisted_accounts: ['123456789012:resource1', '123456789012:resource2']})
      .reply(200, {})
    )
    .stderr()
    .stdout()
    .command(['endpoints:create', 'postgres-123', '--account-id', '123456789012:resource1', '--account-id', '123456789012:resource2', '--app', 'myapp'])
    .it('creates a trusted VPC endpoint with multiple account ids', ctx => {
      expect(ctx.stderr).to.contain('Creating Trusted VPC Endpoint... done')
    })
})
