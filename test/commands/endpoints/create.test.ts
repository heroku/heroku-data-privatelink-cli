import {expect, test} from '../../test'

describe('endpoints:create', () => {
  test
    .nock('https://postgres-api.heroku.com', api => api
      .post('/private-link/v0/databases/postgres-123')
      .reply(200, {})
    )
    .stderr()
    .stdout()
    .command(['endpoints:create', 'postgres-123', 'arn:aws:iam::123456789:root', '--app', 'myapp'])
    .it('creates a trusted VPC endpoint', ctx => {
      expect(ctx.stderr).to.contain('Creating Trusted VPC Endpoint... done')
    })
})
