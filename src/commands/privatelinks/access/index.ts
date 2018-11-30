import Command, {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import getHost from '../../../lib/get-host'

const SHOGUN_URL = `https://${getHost()}/private-link/v0/databases`

export default class PrivateLinksAccessIndex extends Command {
  static description = 'get information on the status of your Private Link'

  static args = [
    {name: 'database'},
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku privatelinks:access',
    '$ heroku privatelinks:access postgresql-rigid-37567',
  ]

  async run() {
    const {args} = this.parse(PrivateLinksAccessIndex)

    let defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    const {body: {whitelisted_accounts}} = await this.heroku.get<any>(`${SHOGUN_URL}/${args.database}`, defaultOptions)

    if (whitelisted_accounts.length > 0) {
      cli.table(whitelisted_accounts, {
        columns: [
          {key: 'arn', label: 'Amazon Resource Name'},
          {key: 'status', label: 'Status'},
        ]
      })
    } else {
      cli.error('There are no whitelisted accounts')
    }
  }
}
