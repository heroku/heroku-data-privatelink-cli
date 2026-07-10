import {flags} from '@heroku-cli/command'
import {Args} from '@oclif/core'
import {ux} from '@oclif/core/ux'

import BaseCommand from '../../../../base.js'

export default class Remove extends BaseCommand {
  static args = {
    database: Args.string({required: true}),
  }
  static description = 'remove an allowed account from your privatelink endpoint'
  static examples = [
    '$ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/xyz --app my-app',
    '$ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app',
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
  static hiddenAliases = ['pg:privatelink:access:remove', 'kafka:privatelink:access:remove', 'redis:privatelink:access:remove']

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Remove)
    const database = await this.resolveAddon(args.database, flags.app)
    const {'aws-account-id': accountIds} = flags
    const accountFormatted = accountIds.length > 1 ? 'accounts' : 'account'

    ux.action.start(`Removing ${accountFormatted}`)
    await this.shogun.patch(`/private-link/v0/databases/${database}/allowed_accounts`, {
      ...this.shogun.defaults,
      body: {
        allowed_accounts: accountIds,
      },
    })
    ux.action.stop()
  }
}
