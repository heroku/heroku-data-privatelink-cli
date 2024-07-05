import {flags} from '@heroku-cli/command'
import {Args, ux} from '@oclif/core'
import BaseCommand from '../../../../base'
import fetcher from '../../../../lib/fetcher'

export default class Add extends BaseCommand {
  static description = 'add an allowed account to your privatelink endpoint'
  static hiddenAliases = ['pg:privatelink:access:add', 'kafka:privatelink:access:add', 'redis:privatelink:access:add']

  static args = {
    database: Args.string({required: true}),
  }

  static flags = {
    'aws-account-id': flags.string({
      char: 'i',
      description: 'AWS account id to use',
      required: true,
      multiple: true,
    }),
    app: flags.app({required: true}),
    remote: flags.remote(),
  }

  static examples = [
    '$ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc -a my-app',
    '$ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz -a my-app',
  ]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Add)
    const database = await fetcher(this.heroku, args.database, flags.app)
    const {'aws-account-id': account_ids} = flags
    const accountFormatted = account_ids.length > 1 ? 'accounts' : 'account'

    ux.action.start(`Adding ${accountFormatted}`)
    await this.shogun.put(`/private-link/v0/databases/${database}/allowed_accounts`, {
      ...this.shogun.defaults,
      body: {
        allowed_accounts: account_ids,
      },
    })
    ux.action.stop()
  }
}
