import {stderr, stdout} from 'stdout-stderr'
import Cmd from '../../../../../src/commands/data/privatelink/create'
import runCommand from '../../../../helpers/runCommand'
import {expect} from 'chai'
import {addonsFetcherResponse} from '../../../../fixtures'
import * as nock from 'nock'
import heredoc from 'tsheredoc'

describe('data:privatelink:create', function () {
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

  it('creates a privatelink endpoint with one account id', async function () {
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

    expect(stderr.output).to.eq(heredoc`
      Creating privatelink endpoint...
      Creating privatelink endpoint... done
    `)
    expect(stdout.output).to.eq(heredoc`

      Service Name: Provisioning

      The privatelink endpoint is now being provisioned for postgres-123.
      Run heroku data:privatelink:wait postgres-123 --app myapp to check the creation process.
    `)
  })

  it('creates a privatelink endpoint with multiple account ids', async function () {
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

    expect(stderr.output).to.eq(heredoc`
      Creating privatelink endpoint...
      Creating privatelink endpoint... done
    `)
    expect(stdout.output).to.eq(heredoc`

      Service Name: Provisioning

      The privatelink endpoint is now being provisioned for postgres-123.
      Run heroku data:privatelink:wait postgres-123 --app myapp to check the creation process.
    `)
  })
})
