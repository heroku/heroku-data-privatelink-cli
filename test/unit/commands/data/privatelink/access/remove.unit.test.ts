import {stderr} from 'stdout-stderr'
import Cmd from '../../../../../../src/commands/data/privatelink/access/remove'
import runCommand from '../../../../../helpers/runCommand'
import {expect} from 'chai'
import {addonsFetcherResponse} from '../../../../../fixtures'
import * as nock from 'nock'
import heredoc from 'tsheredoc'

describe('data:privatelink:access:remove', function () {
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

  it('adds an allowed account', async function () {
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

    expect(stderr.output).to.eq('Removing account...\nRemoving account... done\n')
  })

  it('removes multiple allowed accounts', async function () {
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

    expect(stderr.output).to.eq(heredoc`
      Removing accounts...
      Removing accounts... done
    `)
  })
})
