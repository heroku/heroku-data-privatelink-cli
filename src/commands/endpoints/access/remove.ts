import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand from '../../../base'
import fetcher from '../../../lib/fetcher'

export default class EndpointsAccessRemove extends BaseCommand {
  static description = 'remove an account from your Trusted VPC Endpoint\'s whitelist'

  static args = [
    {name: 'database'},
  ]

  static flags = {
    'account-ids': flags.string({required: true}),
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:access:remove postgresql-sushi-12345 --account-ids 12345:user/xyz',
    '$ heroku endpoints:access:remove postgresql-sushi-12345 --account-ids "12345:user/abc 45678:user/xyz" # multiple account ids must be in "quotes"',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsAccessRemove)
    const database = args.database || await fetcher(this.heroku, flags.app)
    const account_ids = flags['account-ids'].split(' ')
    const accountFormatted = account_ids.length > 1 ? 'accounts' : 'account'
    cli.action.start(`Removing ${accountFormatted} from the whitelist`)
    await this.heroku.patch(`/private-link/v0/databases/${database}/whitelisted_accounts`, {
      ...this.heroku.defaults,
      body: {
        whitelisted_accounts: account_ids
      }
    })
    cli.action.stop()
  }
}
