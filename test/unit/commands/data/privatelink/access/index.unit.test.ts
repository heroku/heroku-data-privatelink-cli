import {runCommand} from '@heroku-cli/test-utils'
import nock from 'nock'
import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest'

import Cmd from '../../../../../../src/commands/data/privatelink/access/index.js'
import {addonsFetcherResponse} from '../../../../../fixtures/index.js'
import removeAllWhitespace from '../../../../../helpers/utils/remove-whitespaces.js'

describe('data:privatelink:access', () => {
  const privateLinkAllowlistResponse = {
    addon: {name: 'postgres-123'},
    allowed_accounts: [{arn: 'arn:aws:iam::123456789:root', status: 'Available'}],
    app: {name: 'myapp'},
    connections: [],
    service_name: 'com.amazonaws.vpce.testvpc"',
    status: 'Operational',
  }
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

  it('shows all allowed accounts', async () => {
    shogun
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkAllowlistResponse)
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    const {stdout} = await runCommand(Cmd, [
      'postgres-123',
      '--app',
      'myapp',
    ])

    const actual = removeAllWhitespace(stdout)
    expect(actual).to.include(removeAllWhitespace('ARN Status'))
    expect(actual).to.include(removeAllWhitespace('arn:aws:iam::123456789:root Available'))
  })

  it('tells the user when there are no allowed accounts', async () => {
    shogun
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, {...privateLinkAllowlistResponse, allowed_accounts: []})
    api
      .post('/actions/addons/resolve')
      .reply(200, addonsFetcherResponse)

    const {stdout} = await runCommand(Cmd, [
      'postgres-123',
      '--app',
      'myapp',
    ])

    expect(stdout).to.contain('There are no allowed accounts')
  })
})
