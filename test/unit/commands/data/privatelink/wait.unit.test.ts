import {runCommand} from '@heroku-cli/test-utils'
import nock from 'nock'
import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest'

import Cmd from '../../../../../src/commands/data/privatelink/wait.js'
import {addonsFetcherResponse} from '../../../../fixtures/index.js'
import {stubUxActionStart} from '../../../../helpers/stub-ux-action.js'

describe('data:privatelink:wait', () => {
  const privateLinkListResponse = {
    addon: {name: 'postgres-123'},
    allowed_accounts: [],
    app: {name: 'myapp'},
    connections: [],
    service_name: 'com.amazonaws.vpce.testvpc',
    status: 'Operational',
  }
  const privateLinkProvisioningResponse = {
    ...privateLinkListResponse,
    status: 'Provisioning',
  }
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

  it('waits for a privatelink endpoint to be provisioned', async () => {
    shogun
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkListResponse)
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    const {stderr} = await runCommand(Cmd, [
      'postgres-123',
      '--app',
      'myapp',
    ])

    expect(stderr).to.contain('Waiting for the privatelink endpoint to be provisioned')
  })

  it('polls until the endpoint becomes operational', async () => {
    shogun
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkProvisioningResponse)
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkListResponse)
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    const {stderr} = await runCommand(Cmd, [
      'postgres-123',
      '--app',
      'myapp',
    ])

    expect(stderr).to.contain('Waiting for the privatelink endpoint to be provisioned')
  })

  it('errors when the addon cannot be resolved', async () => {
    api
      .post('/actions/addons/resolve')
      .reply(200, [])

    const {error} = await runCommand(Cmd, [
      'postgres-123',
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
      '--app',
      'myapp',
    ])

    expect(error?.message).to.contain('Ambiguous identifier; multiple matching add-ons found')
  })
})
