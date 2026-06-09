import {stderr} from 'stdout-stderr'
import Cmd from '../../../../../src/commands/data/privatelink/destroy'
import runCommand from '../../../../helpers/runCommand'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'
import {addonsFetcherResponse} from '../../../../fixtures'
import nock from 'nock'
import heredoc from 'tsheredoc'

describe('data:privatelink:destroy', () => {
  let api: nock.Scope
  let shogun: nock.Scope

  beforeEach(() => {
    api = nock('https://api.heroku.com')
    shogun = nock('https://api.data.heroku.com')
  })

  afterEach(() => {
    api.done()
    shogun.done()
    nock.cleanAll()
  })

  it('destroys a privatelink endpoint', async () => {
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

    expect(stderr.output).toBe(heredoc`
      Destroying privatelink endpoint...
      Destroying privatelink endpoint... done
    `)
  })
})
