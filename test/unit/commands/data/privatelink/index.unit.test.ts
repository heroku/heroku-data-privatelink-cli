import {runCommand} from '@heroku-cli/test-utils'
import nock from 'nock'
import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest'

import Cmd from '../../../../../src/commands/data/privatelink/index.js'
import {
  addonsFetcherResponse,
  privateLinkKafkaOperational,
  privateLinkNewlyCreated,
  privateLinkOperational,
  privateLinkWithConnections,
} from '../../../../fixtures/index.js'
import removeAllWhitespace from '../../../../helpers/utils/remove-whitespaces.js'

describe('data:privatelink', () => {
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

  it('shows the status of a privatelink endpoint, including allowed accounts and connections', async () => {
    shogun
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkWithConnections)
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    const {stdout} = await runCommand(Cmd, [
      'postgres-123',
      '--app',
      'myapp',
    ])

    expect(stdout).to.contain('privatelink endpoint status for postgres-123')
    expect(stdout).to.contain('Service Name: com.amazonaws.vpce.testvpc')
    expect(stdout).to.contain('Status:       Operational')
    expect(stdout).to.contain('Allowed Accounts')
    expect(stdout).to.contain('Connections')

    const actual = removeAllWhitespace(stdout)
    expect(actual).to.include(removeAllWhitespace('ARN Status'))
    expect(actual).to.include(removeAllWhitespace('arn:aws:iam::12345567890:root Active'))
    expect(actual).to.include(removeAllWhitespace('Endpoint ID Owner ARN Status'))
    expect(actual).to.include(removeAllWhitespace('123456 arn:aws:iam::12345567890:root Available'))
  })

  it('tells the user to run heroku data:privatelink:wait for a newly created endpoint', async () => {
    shogun
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkNewlyCreated)
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    const {stdout} = await runCommand(Cmd, [
      'postgres-123',
      '--app',
      'myapp',
    ])

    expect(stdout).to.contain('The privatelink endpoint is now being provisioned for postgres-123.')
    expect(stdout).to.contain('$ heroku data:privatelink:wait -a myapp')
    expect(stdout).to.contain('to check the creation process.')
  })

  it('tells the user the endpoint is operational when there are no connections', async () => {
    shogun
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkOperational)
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    const {stdout} = await runCommand(Cmd, [
      'postgres-123',
      '--app',
      'myapp',
    ])

    expect(stdout).to.contain('Your privatelink endpoint is now operational.')
    expect(stdout).to.contain('You must now copy the Service Name and follow the rest of the steps listed in https://devcenter.heroku.com/articles/heroku-postgres-via-privatelink')
  })

  it('builds the kafka devcenter link for a kafka addon', async () => {
    shogun
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkKafkaOperational)
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    const {stdout} = await runCommand(Cmd, [
      'postgres-123',
      '--app',
      'myapp',
    ])

    expect(stdout).to.contain('https://devcenter.heroku.com/articles/heroku-kafka-via-privatelink')
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
