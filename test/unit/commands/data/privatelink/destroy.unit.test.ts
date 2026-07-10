import {runCommand} from '@heroku-cli/test-utils'
import nock from 'nock'
import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest'

import Cmd from '../../../../../src/commands/data/privatelink/destroy.js'
import {addonsFetcherResponse} from '../../../../fixtures/index.js'
import {stubUxActionStart} from '../../../../helpers/stub-ux-action.js'

describe('data:privatelink:destroy', () => {
  let api: nock.Scope
  let shogun: nock.Scope
  let uxStub: ReturnType<typeof stubUxActionStart>

  beforeEach(() => {
    api = nock('https://api.heroku.com')
    shogun = nock('https://api.data.heroku.com')
    uxStub = stubUxActionStart()
  })

  afterEach(() => {
    uxStub.restore()
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

    const {stderr} = await runCommand(Cmd, [
      'postgres-123',
      '--app',
      'myapp',
    ])

    expect(stderr).to.contain('Destroying privatelink endpoint')
  })
})
