import {flags} from '@heroku-cli/command'
import {Args, ux} from '@oclif/core'

import BaseCommand from '../../../../base.js'

export default class Add extends BaseCommand {
  static args = {
    database: Args.string({required: true}),
  }
  static description = 'add one or more allowed AWS accounts to your privatelink endpoint'
  static examples = [
    '$ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --app my-app',
    '$ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app',
  ]
  static flags = {
    app: flags.app({required: true}),
    'aws-account-id': flags.string({
      char: 'i',
      description: 'AWS account id to use',
      multiple: true,
      required: true,
    }),
    remote: flags.remote(),
  }
  static hiddenAliases = ['pg:privatelink:access:add', 'kafka:privatelink:access:add', 'redis:privatelink:access:add']

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Add)
    const database = await this.resolveAddon(args.database, flags.app)
    const {'aws-account-id': accountIds} = flags
    const accountFormatted = accountIds.length > 1 ? 'accounts' : 'account'

    ux.action.start(`Adding ${accountFormatted}`)
    await this.shogun.put(`/private-link/v0/databases/${database}/allowed_accounts`, {
      ...this.shogun.defaults,
      body: {
        allowed_accounts: accountIds,
      },
    })
    ux.action.stop()
  }
}
