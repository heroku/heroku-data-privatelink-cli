import {stderr} from 'stdout-stderr'
import Cmd from '../../../../../../src/commands/data/privatelink/access/remove'
import runCommand from '../../../../../helpers/runCommand'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'
import {addonsFetcherResponse} from '../../../../../fixtures'
import nock from 'nock'
import heredoc from 'tsheredoc'

describe('data:privatelink:access:remove', () => {
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

  it('adds an allowed account', async () => {
    shogun
      .patch('/private-link/v0/databases/postgres-123/allowed_accounts', {allowed_accounts: ['123456789012:root']})
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

    expect(stderr.output).toBe('Removing account...\nRemoving account... done\n')
  })

  it('removes multiple allowed accounts', async () => {
    shogun
      .patch('/private-link/v0/databases/postgres-123/allowed_accounts', {allowed_accounts: ['123456789012:resource1', '123456789012:resource2']})
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
      Removing accounts...
      Removing accounts... done
    `)
  })
})
