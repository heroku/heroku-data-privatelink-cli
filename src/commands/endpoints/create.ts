import color from '@heroku-cli/color'
import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand from '../../base'
import fetcher from '../../lib/fetcher'

export default class EndpointsCreate extends BaseCommand {
  static description = 'create a new Trusted VPC Endpoint for your database'

  static args = [
    {name: 'database'},
  ]

  static flags = {
    account_ids: flags.string({required: true}),
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:create',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsCreate)
    const account_ids = flags.account_ids.split(',').map((account: any) => account.trim())
    const database = args.database || await fetcher(this.heroku, flags.app)

    cli.action.start('Creating Trusted VPC Endpoint')

    const {body: res} = await this.heroku.post<any>(`/private-link/v0/databases/${database}`, {
      ...this.heroku.defaults,
      body: {
        whitelisted_accounts: account_ids
      }
    })

    cli.action.stop()
    cli.log()
    cli.styledObject({
      Status: res.status,
      'Service Name': res.service_name,
      'Whitelisted Accounts': res.whitelisted_accounts,
    })

    cli.log(`
Please copy the ${color.cyan('Service Name')} and follow the rest of the instructions here: https://devcenter.heroku.com/articles/private-links`)
  }
}
