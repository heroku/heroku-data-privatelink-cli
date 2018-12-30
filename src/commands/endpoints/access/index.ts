import Command, {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import host from '../../../lib/host'

const SHOGUN_URL = `https://${host()}/private-link/v0/databases`

export default class EndpointsAccessIndex extends Command {
  static description = 'list all accounts for your Trusted VPC Endpoint\'s whitelist'

  static args = [
    {name: 'database', required: true},
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:access postgresql-rigid-37567',
  ]

  async run() {
    const {args} = this.parse(EndpointsAccessIndex)

    let defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    const {body: {whitelisted_accounts}} = await this.heroku.get<any>(`${SHOGUN_URL}/${args.database}`, defaultOptions)

    if (whitelisted_accounts.length > 0) {
      cli.table(whitelisted_accounts, {
        arn: {
          header: 'ARN'
        },
        status: {
          header: 'Status'
        }
      })
    } else {
      cli.error('There are no whitelisted accounts')
    }
  }
}
