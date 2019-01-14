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

    if (res.status === 'Provisioning') {
      cli.log()
      cli.log(`The Trusted VPC Endpoint is now being provisioned for ${color.cyan(database)}.`)
      cli.log(`Run ${color.cyan('heroku endpoints:wait')} to check the creation process.`)
    } else {
      cli.styledHeader(`Trusted VPC Endpoint status for ${color.cyan(database)}`)
      cli.styledObject({
        Status: res.status,
        'Service Name': res.service_name || 'Provisioning',
      })

      if (res && res.whitelisted_accounts.length > 0) {
        cli.log()
        cli.styledHeader('Whitelisted Accounts')
        cli.table(res.whitelisted_accounts, {
          arn: {header: 'ARN'},
          status: {}
        })
      }

      cli.log()
      if (res && res.connections.length > 0) {
        cli.styledHeader('Connections')
        cli.table(res.connections, {
          endpoint_id: {header: 'Endpoint ID'},
          owner_arn: {header: 'Owner ARN'},
          status: {}
        })
      } else if (res.status === 'Operational' && res.connections.length === 0) {
        cli.log('Your Trusted VPC Endpoint is now operational.')
        cli.log(`You must now copy the ${color.cyan('Service Name')} and follow the rest of the steps listed in https://devcenter.heroku.com/articles/trusted-vpc-endpoints.`)
      }
    }
  }
}
