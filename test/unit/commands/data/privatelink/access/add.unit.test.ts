import {stderr} from 'stdout-stderr'
import Cmd from '../../../../../../src/commands/data/privatelink/access/add'
import runCommand from '../../../../../helpers/runCommand'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'
import {addonsFetcherResponse} from '../../../../../fixtures'
import nock from 'nock'
import heredoc from 'tsheredoc'

describe('data:privatelink:access:add', () => {
  let api: nock.Scope
  let shogun: nock.Scope

  beforeEach(() => {
    api = nock('https://api.heroku.com:443')
    shogun = nock('https://api.data.heroku.com:443')
  })

  afterEach(() => {
    api.done()
    shogun.done()
    nock.cleanAll()
  })

  it('adds an allowed account', async () => {
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)
    shogun
      .put('/private-link/v0/databases/postgres-123/allowed_accounts', {allowed_accounts: ['123456789012:root']})
      .reply(200, {})

    await runCommand(Cmd, [
      'postgres-123',
      '--aws-account-id',
      '123456789012:root',
      '--app',
      'myapp',
    ])

    expect(stderr.output).toBe(heredoc`
      Adding account...
      Adding account... done
    `)
  })

  it('adds multiple allowed accounts', async () => {
    shogun
      .put('/private-link/v0/databases/postgres-123/allowed_accounts', {allowed_accounts: ['123456789012:resource1', '123456789012:resource2']})
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
      Adding accounts...
      Adding accounts... done
    `)
  })
})
