import {expect, test} from '../../../test'

describe('endpoints:access:add', () => {
  test
    .nock('https://postgres-api.heroku.com', api => api
      .put('/private-link/v0/databases/postgres-123/whitelisted_accounts')
      .reply(200, {})
    )
    .stdout()
    .stderr()
    .command(['endpoints:access:add', 'postgres-123', 'arn:aws:iam::123456789:root', '--app', 'myapp'])
    .it('adds an account to the whitelist', ctx => {
      expect(ctx.stderr).to.contain('Adding account to the whitelist... done')
    })
})
