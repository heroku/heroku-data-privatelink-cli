import {expect, test} from '../../test'

describe('endpoints:destroy', () => {
  test
    .nock('https://postgres-api.heroku.com', api => api
      .delete('/private-link/v0/databases/postgres-123')
      .reply(200, {})
    )
    .stderr()
    .stdout()
    .command(['endpoints:destroy', 'postgres-123', '--app', 'myapp'])
    .it('destroys a trusted VPC endpoint', ctx => {
      expect(ctx.stderr).to.contain('Destroying Trusted VPC Endpoint... done')
    })
})
