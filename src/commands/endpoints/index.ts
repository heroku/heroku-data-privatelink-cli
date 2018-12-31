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

    if (res.status === null) {
      cli.error(`Your Trusted VPC Endpoint is still provisioning. Run ${color.cyan('heroku endpoints:wait')} to wait for it to be updated.`)
    }

    cli.styledHeader(`Trusted VPC Endpoints for ${color.cyan(database)}`)
    cli.styledObject({
      Status: res.status,
      'Service Name': res.service_name,
    })

    cli.log()
    cli.styledHeader(`Whitelisted Accounts for ${color.cyan(database)}`)
    if (res && res.whitelisted_accounts.length > 0) {
      cli.table(res.whitelisted_accounts, {
        arn: {header: 'ARN'},
        status: {}
      })
    }

    cli.log()
    cli.styledHeader(`Connections for ${color.cyan(database)}`)
    if (res && res.connections.length > 0) {
      cli.table(res.connections, {
        endpoint_id: {header: 'Endpoint ID'},
        owner_arn: {header: 'Owner ARN'},
        status: {}
      })
    }
  }
}
