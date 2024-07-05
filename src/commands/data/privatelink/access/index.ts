import {flags} from '@heroku-cli/command'
import {Args, ux} from '@oclif/core'
import BaseCommand, {PrivateLinkDB} from '../../../../base'
import fetcher from '../../../../lib/fetcher'

export default class Index extends BaseCommand {
  static topic = 'data:privatelink:access'
  static description = 'list all allowed accounts for your privatelink endpoint'
  static hiddenAliases = ['pg:privatelink:access', 'kafka:privatelink:access', 'redis:privatelink:access']

  static args = {
    database: Args.string({required: true}),
  }

  static flags = {
    app: flags.app({required: true}),
    remote: flags.remote(),
  }

  static examples = [
    '$ heroku data:privatelink:access postgresql-sushi-12345 -a my-app',
  ]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Index)
    const database = await fetcher(this.heroku, args.database, flags.app)

    const {body: {allowed_accounts}} = await this.shogun.get<PrivateLinkDB>(`/private-link/v0/databases/${database}`, this.shogun.defaults)

    if (allowed_accounts.length > 0) {
      ux.table(allowed_accounts, {
        arn: {
          header: 'ARN',
        },
        status: {
          header: 'Status',
        },
      })
    } else {
      ux.log('There are no allowed accounts')
    }
  }
}
