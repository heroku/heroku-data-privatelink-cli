import {stderr, stdout} from 'stdout-stderr'
import Cmd from '../../../../../src/commands/data/privatelink/create'
import runCommand from '../../../../helpers/runCommand'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'
import {addonsFetcherResponse} from '../../../../fixtures'
import nock from 'nock'
import heredoc from 'tsheredoc'

describe('data:privatelink:create', () => {
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

  it('creates a privatelink endpoint with one account id', async () => {
    shogun
      .post('/private-link/v0/databases/postgres-123', {allowed_accounts: ['123456789012:root']})
      .reply(200, {})
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    await runCommand(Cmd, [
      'postgres-123',
      '--aws-account-id',
      '123456789012:root',
      '--app',
      'myapp',
    ])

    expect(stderr.output).toBe(heredoc`
      Creating privatelink endpoint...
      Creating privatelink endpoint... done
    `)
    expect(stdout.output).toBe(heredoc`

      Service Name: Provisioning

      The privatelink endpoint is now being provisioned for postgres-123.
      Run heroku data:privatelink:wait postgres-123 --app myapp to check the creation process.
    `)
  })

  it('creates a privatelink endpoint with multiple account ids', async () => {
    shogun
      .post('/private-link/v0/databases/postgres-123', {allowed_accounts: ['123456789012:resource1', '123456789012:resource2']})
      .reply(200, {})
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    await runCommand(Cmd, [
      'postgres-123',
      '--aws-account-id',
      '123456789012:resource1',
      '--aws-account-id',
      '123456789012:resource2',
      '--app',
      'myapp',
    ])

    expect(stderr.output).toBe(heredoc`
      Creating privatelink endpoint...
      Creating privatelink endpoint... done
    `)
    expect(stdout.output).toBe(heredoc`

      Service Name: Provisioning

      The privatelink endpoint is now being provisioned for postgres-123.
      Run heroku data:privatelink:wait postgres-123 --app myapp to check the creation process.
    `)
  })
})
