import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand from '../../../base'
import fetcher from '../../../lib/fetcher'

export default class EndpointsAccessAdd extends BaseCommand {
  static description = 'add an account to your Trusted VPC Endpoints\'s whitelist'

  static args = [
    {name: 'database'},
  ]

  static flags = {
    'account-id': flags.build({
      char: 'A',
      description: 'account id to use',
      parse: (input: string, ctx: any) => {
        if (!ctx.endpoints_access_add_ids) ctx.endpoints_access_add_ids = []
        ctx.endpoints_access_add_ids.push(input)
        return ctx.endpoints_access_add_ids
      },
    })(),
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:access:add postgresql-sushi-12345 --account-id 123456789012:user/abc',
    '$ heroku endpoints:access:add postgresql-sushi-12345 --account-id 123456789012:user/abc --account-id 123456789012:user/xyz',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsAccessAdd)
    const database = args.database || await fetcher(this.heroku, flags.app)
    const account_ids = flags['account-id']
    const accountFormatted = account_ids.length > 1 ? 'accounts' : 'account'

    cli.action.start(`Adding ${accountFormatted} to the whitelist`)
    await this.heroku.put(`/private-link/v0/databases/${database}/whitelisted_accounts`, {
      ...this.heroku.defaults,
      body: {
        whitelisted_accounts: account_ids
      }
    })
    cli.action.stop()
  }
}
