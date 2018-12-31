import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand from '../../../base'
import fetcher from '../../../lib/fetcher'

export default class EndpointsAccessIndex extends BaseCommand {
  static description = 'list all accounts for your Trusted VPC Endpoint\'s whitelist'

  static args = [
    {name: 'database'},
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:access postgresql-rigid-37567',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsAccessIndex)
    const database = args.database || await fetcher(this.heroku, flags.app)

    const {body: {whitelisted_accounts}} = await this.heroku.get<any>(`/private-link/v0/databases/${database}`, this.heroku.defaults)

    if (whitelisted_accounts.length > 0) {
      cli.table(whitelisted_accounts, {
        arn: {
          header: 'ARN'
        },
        status: {
          header: 'Status'
        }
      })
    } else {
      cli.error('There are no whitelisted accounts')
    }
  }
}
