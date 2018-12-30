import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand from '../../../base'

export default class EndpointsAccessAdd extends BaseCommand {
  static description = 'add an account to your Trusted VPC Endpoints\'s whitelist'

  static args = [
    {name: 'database', required: true},
    {name: 'account_ids', required: true}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:access:add postgresql-rigid-37567 123456',
    '$ heroku endpoints:access:add postgresql-rigid-37567 123456,7891011',
  ]

  async run() {
    const {args} = this.parse(EndpointsAccessAdd)

    cli.action.start('Adding account to the whitelist')
    await this.heroku.put<any>(`/private-link/v0/databases/${args.database}/whitelisted_accounts`, {
      ...this.heroku.defaults,
      body: {
        whitelisted_accounts: [args.account_ids]
      }
    })
    cli.action.stop()
  }
}
