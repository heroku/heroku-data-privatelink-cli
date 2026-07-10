import {flags} from '@heroku-cli/command'
import {table} from '@heroku/heroku-cli-util/hux'
import {Args} from '@oclif/core'
import {ux} from '@oclif/core/ux'

import BaseCommand, {PrivateLinkDB} from '../../../../base.js'

export default class Index extends BaseCommand {
  static args = {
    database: Args.string({required: true}),
  }
  static description = 'list all allowed accounts for your privatelink endpoint'
  static examples = [
    '$ heroku data:privatelink:access postgresql-sushi-12345 --app my-app',
  ]
  static flags = {
    app: flags.app({required: true}),
    remote: flags.remote(),
  }
  static hiddenAliases = ['pg:privatelink:access', 'kafka:privatelink:access', 'redis:privatelink:access']
  static topic = 'data:privatelink:access'

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Index)
    const database = await this.resolveAddon(args.database, flags.app)

    const {body: {allowed_accounts: allowedAccounts}} = await this.shogun.get<PrivateLinkDB>(`/private-link/v0/databases/${database}`, this.shogun.defaults)

    if (allowedAccounts.length > 0) {
      table(allowedAccounts, {
        arn: {
          header: 'ARN',
        },
        status: {
          header: 'Status',
        },
      })
    } else {
      ux.stdout('There are no allowed accounts')
    }
  }
}
