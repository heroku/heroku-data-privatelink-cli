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
    account_ids: flags.string({required: true}),
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:access:remove --account_ids arn:aws:iam::12345678910:root',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsAccessRemove)
    const database = args.database || await fetcher(this.heroku, flags.app)

    cli.action.start('Removing account from the whitelist')
    await this.heroku.patch<any>(`/private-link/v0/databases/${database}/whitelisted_accounts`, {
      ...this.heroku.defaults,
      body: {
        whitelisted_accounts: [flags.account_ids]
      }
    })
    cli.action.stop()
  }
}
