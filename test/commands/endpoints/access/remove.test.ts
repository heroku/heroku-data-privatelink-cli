import {expect, test} from '../../../test'

describe('endpoints:access:remove', () => {
  test
    .nock('https://postgres-api.heroku.com', api => api
      .patch('/private-link/v0/databases/postgres-123/whitelisted_accounts')
      .reply(200, {})
    )
    .stdout()
    .stderr()
    .command(['endpoints:access:remove', 'postgres-123', '--account-id', 'arn:aws:iam::123456789:root', '--app', 'myapp'])
    .it('removes an account from the whitelist', ctx => {
      expect(ctx.stderr).to.contain('Removing account from the whitelist... done')
    })

  test
    .nock('https://postgres-api.heroku.com', api => api
      .patch('/private-link/v0/databases/postgres-123/whitelisted_accounts')
      .reply(200, {})
    )
    .stdout()
    .stderr()
    .command(['endpoints:access:remove', 'postgres-123', '--account-id', 'arn:aws:iam::123456789:resource1', '--account-id', 'arn:aws:iam::123456789:resource2', '--app', 'myapp'])
    .it('removes multiple accounts from the whitelist', ctx => {
      expect(ctx.stderr).to.contain('Removing accounts from the whitelist... done')
    })
})
