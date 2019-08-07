import {addonsFetcherResponse} from '../../../fixtures'
import {expect, test} from '../../../test'

describe('data:privatelink:destroy', () => {
  test
    .nock('https://postgres-api.heroku.com', api => api
      .delete('/private-link/v0/databases/postgres-123')
      .reply(200, {})
    )
    .nock('https://api.heroku.com', api => api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)
    )
    .stderr()
    .stdout()
    .command(['data:privatelink:destroy', 'postgres-123', '--app', 'myapp'])
    .it('destroys a privatelink endpoint', ctx => {
      expect(ctx.stderr).to.contain('Destroying privatelink endpoint... done')
    })
})
