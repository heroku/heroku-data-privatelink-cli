import {stderr} from 'stdout-stderr'
import Cmd from '../../../../../src/commands/data/privatelink/destroy'
import runCommand from '../../../../helpers/runCommand'
import {expect} from 'chai'
import {addonsFetcherResponse} from '../../../../fixtures'
import * as nock from 'nock'
import heredoc from 'tsheredoc'

describe('data:privatelink:destroy', function () {
  let api: nock.Scope
  let shogun: nock.Scope

  beforeEach(function () {
    api = nock('https://api.heroku.com')
    shogun = nock('https://api.data.heroku.com')
  })

  afterEach(function () {
    api.done()
    shogun.done()
    nock.cleanAll()
  })

  it('destroys a privatelink endpoint', async function () {
    shogun
      .delete('/private-link/v0/databases/postgres-123')
      .reply(200, {})
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    await runCommand(Cmd, [
      'postgres-123',
      '--app',
      'myapp',
    ])

    expect(stderr.output).to.eq(heredoc`
      Destroying privatelink endpoint...
      Destroying privatelink endpoint... done
    `)
  })
})
