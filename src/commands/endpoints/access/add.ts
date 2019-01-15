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
    '$ heroku endpoints:access:add postgresql-rigid-37567 --account_ids 123456',
    '$ heroku endpoints:access:add postgresql-rigid-37567 --account_ids 123456,78910',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsAccessAdd)
    const database = args.database || await fetcher(this.heroku, flags.app)

    cli.action.start('Adding account to the whitelist')
    await this.heroku.put<any>(`/private-link/v0/databases/${database}/whitelisted_accounts`, {
      ...this.heroku.defaults,
      body: {
        whitelisted_accounts: [flags.account_ids]
      }
    })
    cli.action.stop()
  }
}
