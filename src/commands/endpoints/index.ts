import color from '@heroku-cli/color'
import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand from '../../base'
import fetcher from '../../lib/fetcher'

export default class EndpointsIndex extends BaseCommand {
  static description = 'list all your Trusted VPC Endpoints'

  static args = [
    {name: 'database'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsIndex)

    const database = args.database || await fetcher(this.heroku, flags.app)
    const {body: res} = await this.heroku.get<any>(`/private-link/v0/databases/${database}`, this.heroku.defaults)

    cli.styledHeader(`Trusted VPC Endpoints for ${color.cyan(database)}`)
    if (res.connections.length > 0) {
      cli.styledObject({
        Status: res.status,
        'Service Name': res.service_name,
        'Whitelisted Accounts': res.whitelisted_accounts,
        Connections: res.connections
      })
    } else if (res.service_name) {
      cli.styledObject({
        Status: res.status,
        'Service Name': res.service_name,
        'Whitelisted Accounts': res.whitelisted_accounts,
      })
      cli.log(`
Currently there are no active connections for your Trusted VPC Endpoint.

Please follow these instructions(https://devcenter.heroku.com/articles/endpoints) to fully setup your endpoint.
      `)
    } else {
      cli.log(`
A Trusted VPC Endpoint has not been created for this database.

In order to create one, run $ heroku endpoints:create`)
    }
  }
}
