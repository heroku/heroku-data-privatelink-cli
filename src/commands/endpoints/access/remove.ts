import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand from '../../../base'

export default class EndpointsAccessRemove extends BaseCommand {
  static description = 'remove an account from your Trusted VPC Endpoint\'s whitelist'

  static args = [
    {name: 'database', required: true},
    {name: 'account_ids', required: true}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:access:remove arn:aws:iam::12345678910:root',
  ]

  async run() {
    const {args} = this.parse(EndpointsAccessRemove)

    cli.action.start('Removing account from the whitelist')
    await this.heroku.patch<any>(`/private-link/v0/databases/${args.database}/whitelisted_accounts`, {
      ...this.heroku.defaults,
      body: {
        whitelisted_accounts: [args.account_ids]
      }
    })
    cli.action.stop()
  }
}
