import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand from '../../../base'
import fetcher from '../../../lib/fetcher'

export default class EndpointsAccessAdd extends BaseCommand {
  static description = 'add an account to your Trusted VPC Endpoints\'s whitelist'

  static args = [
    {name: 'database'},
  ]

  static flags = {
    'account-ids': flags.string({required: true}),
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:access:add postgresql-sushi-12345 --account-ids 12345:user/abc',
    '$ heroku endpoints:access:add postgresql-sushi-12345 --account-ids "12345:user/abc 45678:user/xyz" # multiple account ids must be in "quotes"',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsAccessAdd)
    const database = args.database || await fetcher(this.heroku, flags.app)
    const account_ids = flags['account-ids'].split(' ').map((account: any) => account.trim())
    const accountFormatted = account_ids.length > 1 ? 'accounts' : 'account'
    cli.action.start(`Adding ${accountFormatted} to the whitelist`)
    await this.heroku.put(`/private-link/v0/databases/${database}/whitelisted_accounts`, {
      ...this.heroku.defaults,
      body: {
        whitelisted_accounts: account_ids
      }
    })
    cli.action.stop()
  }
}
