import Command, {flags} from '@heroku-cli/command'

import host from '../../../lib/host'

const SHOGUN_URL = `https://${host()}/private-link/v0/databases`

export default class EndpointsAccessAdd extends Command {
  static description = 'add an account to your Trusted VPC Endpoints\'s whitelist'

  static args = [
    {name: 'database', require: true},
    {name: 'account_ids'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:access:add 123456',
    '$ heroku endpoints:access:add 123456,7891011',
  ]

  async run() {
    const {args} = this.parse(EndpointsAccessAdd)

    let defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    await this.heroku.put<any>(`${SHOGUN_URL}/${args.database}/whitelisted_accounts`, {
      ...defaultOptions,
      body: {
        whitelisted_accounts: [args.account_ids]
      }
    })
  }
}
