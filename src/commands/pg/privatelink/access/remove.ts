import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand from '../../../../base'
import fetcher from '../../../../lib/fetcher'

export default class EndpointsAccessRemove extends BaseCommand {
  static description = 'remove an account from your privatelink endpoint\'s whitelist'

  static args = [
    {name: 'database'},
  ]

  static flags = {
    'aws-account-id': flags.build({
      char: 'i',
      description: 'AWS account id to use',
      parse: (input: string, ctx: any) => {
        if (!ctx.endpoints_access_remove_ids) ctx.endpoints_access_remove_ids = []
        ctx.endpoints_access_remove_ids.push(input)
        return ctx.endpoints_access_remove_ids
      },
    })(),
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku pg:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/xyz',
    '$ heroku pg:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsAccessRemove)
    const database = await fetcher(this.heroku, args.database, flags.app)
    const account_ids = flags['aws-account-id']
    const accountFormatted = account_ids.length > 1 ? 'accounts' : 'account'

    cli.action.start(`Removing ${accountFormatted} from the whitelist`)
    await this.shogun.patch(`/private-link/v0/databases/${database}/whitelisted_accounts`, {
      ...this.shogun.defaults,
      body: {
        whitelisted_accounts: account_ids
      }
    })
    cli.action.stop()
  }
}
