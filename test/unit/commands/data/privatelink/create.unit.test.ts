import {runCommand} from '@heroku-cli/test-utils'
import nock from 'nock'
import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest'

import Cmd from '../../../../../src/commands/data/privatelink/create.js'
import {addonsFetcherResponse} from '../../../../fixtures/index.js'
import {stubUxActionStart} from '../../../../helpers/stub-ux-action.js'

describe('data:privatelink:create', () => {
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

  it('creates a privatelink endpoint with one account id', async () => {
    shogun
      .post('/private-link/v0/databases/postgres-123', {allowed_accounts: ['123456789012:root']})
      .reply(200, {})
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    const {stderr, stdout} = await runCommand(Cmd, [
      'postgres-123',
      '--aws-account-id',
      '123456789012:root',
      '--app',
      'myapp',
    ])

    expect(stderr).to.contain('Creating privatelink endpoint')
    expect(stdout).to.contain('Service Name: Provisioning')
    expect(stdout).to.contain('The privatelink endpoint is now being provisioned for postgres-123.')
    expect(stdout).to.contain('$ heroku data:privatelink:wait postgres-123 --app myapp')
    expect(stdout).to.contain('to check the creation process.')
  })

  it('creates a privatelink endpoint with multiple account ids', async () => {
    shogun
      .post('/private-link/v0/databases/postgres-123', {allowed_accounts: ['123456789012:resource1', '123456789012:resource2']})
      .reply(200, {})
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    const {stderr, stdout} = await runCommand(Cmd, [
      'postgres-123',
      '--aws-account-id',
      '123456789012:resource1',
      '--aws-account-id',
      '123456789012:resource2',
      '--app',
      'myapp',
    ])

    expect(stderr).to.contain('Creating privatelink endpoint')
    expect(stdout).to.contain('Service Name: Provisioning')
    expect(stdout).to.contain('The privatelink endpoint is now being provisioned for postgres-123.')
    expect(stdout).to.contain('$ heroku data:privatelink:wait postgres-123 --app myapp')
    expect(stdout).to.contain('to check the creation process.')
  })
})
