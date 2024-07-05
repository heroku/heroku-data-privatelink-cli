import {flags} from '@heroku-cli/command'
import {Args, ux} from '@oclif/core'
import BaseCommand from '../../../../base'
import fetcher from '../../../../lib/fetcher'

export default class Remove extends BaseCommand {
  static description = 'remove an allowed account from your privatelink endpoint'
  static hiddenAliases = ['pg:privatelink:access:remove', 'kafka:privatelink:access:remove', 'redis:privatelink:access:remove']

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
    '$ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/xyz -a my-app',
    '$ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz -a my-app',
  ]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Remove)
    const database = await fetcher(this.heroku, args.database, flags.app)
    const {'aws-account-id': account_ids} = flags
    const accountFormatted = account_ids.length > 1 ? 'accounts' : 'account'

    ux.action.start(`Removing ${accountFormatted}`)
    await this.shogun.patch(`/private-link/v0/databases/${database}/allowed_accounts`, {
      ...this.shogun.defaults,
      body: {
        allowed_accounts: account_ids,
      },
    })
    ux.action.stop()
  }
}
