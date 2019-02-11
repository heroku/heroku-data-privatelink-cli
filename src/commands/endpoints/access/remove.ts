import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand from '../../../base'
import fetcher from '../../../lib/fetcher'

export default class EndpointsAccessRemove extends BaseCommand {
  static description = 'remove an account from your Trusted VPC Endpoint\'s whitelist'

  static args = [
    {name: 'database'},
  ]

  static flags = {
    'account-id': flags.build({
      char: 'i',
      description: 'account id to use',
      parse: (input: string, ctx: any) => {
        if (!ctx.endpoints_access_remove_ids) ctx.endpoints_access_remove_ids = []
        ctx.endpoints_access_remove_ids.push(input)
        return ctx.endpoints_access_remove_ids
      },
    })(),
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:access:remove postgresql-sushi-12345 --account-id 123456789012:user/xyz',
    '$ heroku endpoints:access:remove postgresql-sushi-12345 --account-id 123456789012:user/abc --account-id 123456789012:user/xyz',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsAccessRemove)
    const database = args.database || await fetcher(this.heroku, flags.app)
    const account_ids = flags['account-id']
    const accountFormatted = account_ids.length > 1 ? 'accounts' : 'account'

    cli.action.start(`Removing ${accountFormatted} from the whitelist`)
    await this.heroku.patch(`/private-link/v0/databases/${database}/whitelisted_accounts`, {
      ...this.heroku.defaults,
      body: {
        whitelisted_accounts: account_ids
      }
    })
    cli.action.stop()
  }
}
