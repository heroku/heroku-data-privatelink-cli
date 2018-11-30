import Command, {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import getHost from '../../lib/get-host'

const SHOGUN_URL = `https://${getHost()}/private-link/v0/databases`

export default class PrivateLinksIndex extends Command {
  static description = 'lists all your Private Links'

  static args = [
    {name: 'database'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku privatelinks',
  ]

  async run() {
    const {args} = this.parse(PrivateLinksIndex)

    const defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    const {body: {connections}} = await this.heroku.get<any>(`${SHOGUN_URL}/${args.database}`, defaultOptions)

    if (connections.length > 0) {
      cli.table(connections, {
        columns: [
          {key: 'endpoint_id', label: 'ID'},
          {key: 'owner_arn', label: 'Owner ARN'},
          {key: 'status', label: 'Status'},
        ]
      })
    } else {
      cli.log('Currently there are no active connections')
    }
  }
}
