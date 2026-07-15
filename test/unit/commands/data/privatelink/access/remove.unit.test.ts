import {runCommand} from '@heroku-cli/test-utils'
import nock from 'nock'
import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest'

import Cmd from '../../../../../../src/commands/data/privatelink/access/remove.js'
import {addonsFetcherResponse} from '../../../../../fixtures/index.js'
import {stubUxActionStart} from '../../../../../helpers/stub-ux-action.js'

describe('data:privatelink:access:remove', () => {
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

  it('removes an allowed account', async () => {
    shogun
      .patch('/private-link/v0/databases/postgres-123/allowed_accounts', {allowed_accounts: ['123456789012:root']})
      .reply(200, {})
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    const {stderr} = await runCommand(Cmd, [
      'postgres-123',
      '--aws-account-id',
      '123456789012:root',
      '--app',
      'myapp',
    ])

    expect(stderr).to.contain('Removing account')
  })

  it('removes multiple allowed accounts', async () => {
    shogun
      .patch('/private-link/v0/databases/postgres-123/allowed_accounts', {allowed_accounts: ['123456789012:resource1', '123456789012:resource2']})
      .reply(200, {})
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    const {stderr} = await runCommand(Cmd, [
      'postgres-123',
      '--aws-account-id',
      '123456789012:resource1',
      '--aws-account-id',
      '123456789012:resource2',
      '--app',
      'myapp',
    ])

    expect(stderr).to.contain('Removing accounts')
  })

  it('errors when the addon cannot be resolved', async () => {
    api
      .post('/actions/addons/resolve')
      .reply(200, [])

    const {error} = await runCommand(Cmd, [
      'postgres-123',
      '--aws-account-id',
      '123456789012:root',
      '--app',
      'myapp',
    ])

    expect(error?.message).to.contain('Couldn\'t find that addon.')
  })

  it('errors when the addon identifier is ambiguous', async () => {
    api
      .post('/actions/addons/resolve')
      .reply(200, [
        {addon_service: {name: 'heroku-postgresql'}, name: 'postgres-123'},
        {addon_service: {name: 'heroku-postgresql'}, name: 'postgres-456'},
      ])

    const {error} = await runCommand(Cmd, [
      'postgres-123',
      '--aws-account-id',
      '123456789012:root',
      '--app',
      'myapp',
    ])

    expect(error?.message).to.contain('Ambiguous identifier; multiple matching add-ons found')
  })
})
