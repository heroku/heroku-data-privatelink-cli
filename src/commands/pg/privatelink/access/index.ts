import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand, {PrivateLinkDB} from '../../../../base'
import fetcher from '../../../../lib/fetcher'

export default class EndpointsAccessIndex extends BaseCommand {
  static description = 'list all accounts for your privatelink endpoint\'s whitelist'

  static args = [
    {name: 'database'},
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku pg:privatelink:access postgresql-sushi-12345',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsAccessIndex)
    const database = args.database || await fetcher(this.shogun, flags.app)

    const {body: {whitelisted_accounts}} = await this.shogun.get<PrivateLinkDB>(`/private-link/v0/databases/${database}`, this.shogun.defaults)

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
