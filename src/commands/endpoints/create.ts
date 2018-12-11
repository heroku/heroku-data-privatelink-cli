import color from '@heroku-cli/color'
import Command, {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import host from '../../lib/host'

const SHOGUN_URL = `https://${host()}/private-link/v0/databases`

export default class EndpointsCreate extends Command {
  static description = 'create a new Trusted VPC Endpoint for your database'

  static args = [
    {name: 'database', required: true},
    {name: 'account_ids', required: true}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:create',
  ]

  async run() {
    const {args} = this.parse(EndpointsCreate)

    let defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    const account_ids = args.account_ids.split(',').map(account => account.trim())

    cli.action.start('Creating Trusted VPC Endpoint')

    const {body: res} = await this.heroku.post<any>(`${SHOGUN_URL}/${args.database}`, {
      ...defaultOptions,
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
