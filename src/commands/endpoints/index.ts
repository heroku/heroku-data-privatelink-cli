import Command, {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import getHost from '../../lib/host'

const SHOGUN_URL = `https://${getHost()}/private-link/v0/databases`

export default class EndpointsIndex extends Command {
  static description = 'list all your Private Links'

  static args = [
    {name: 'database'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static aliases = ['pg:endpoints', 'kafka:endpoints', 'redis:endpoints']

  static examples = [
    '$ heroku endpoints',
  ]

  async run() {
    const {args} = this.parse(EndpointsIndex)

    const defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    const {body: res} = await this.heroku.get<any>(`${SHOGUN_URL}/${args.database}`, defaultOptions)

    if (res.connections.length > 0) {
      cli.log(res.service_name)
      cli.table(res.connections, {
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
