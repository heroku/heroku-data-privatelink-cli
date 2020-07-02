import color from '@heroku-cli/color'
import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand, {PrivateLinkDB} from '../../../base'
import addontype from '../../../lib/addontype'
import fetcher from '../../../lib/fetcher'

export default class EndpointsIndex extends BaseCommand {
  static description = 'list all your privatelink endpoints!'
  static aliases = ['pg:privatelink', 'kafka:privatelink', 'redis:privatelink']

  static args = [
    {name: 'database'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku data:privatelink postgresql-sushi-12345',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsIndex)
    const database = await fetcher(this.heroku, args.database, flags.app)
    const {body: res} = await this.shogun.get<PrivateLinkDB>(`/private-link/v0/databases/${database}`, this.shogun.defaults)
    const addonType = await addontype(res.addon.name)

    if (res.status === 'Provisioning') {
      this.log()
      this.log(`The privatelink endpoint is now being provisioned for ${color.cyan(database)}.`)
      this.log(`Run ${color.cyan('heroku data:privatelink:wait -a APP')} to check the creation process.`)
    } else {
      cli.styledHeader(`privatelink endpoint status for ${color.cyan(database)}`)
      cli.styledObject({
        Status: res.status,
        'Service Name': res.service_name || 'Provisioning',
      })

      if (res && res.allowed_accounts.length > 0) {
        this.log()
        cli.styledHeader('Allowed Accounts')
        cli.table(res.allowed_accounts, {
          arn: {header: 'ARN'},
          status: {}
        })
      }

      this.log()
      if (res && res.connections.length > 0) {
        cli.styledHeader('Connections')
        cli.table(res.connections, {
          endpoint_id: {header: 'Endpoint ID'},
          owner_arn: {header: 'Owner ARN'},
          status: {}
        })
      } else if (res.status === 'Operational' && res.connections.length === 0) {
        this.log('Your privatelink endpoint is now operational.')
        this.log(`You must now copy the ${color.cyan('Service Name')} and follow the rest of the steps listed in https://devcenter.heroku.com/articles/heroku-${addonType}-via-privatelink`)
      }
    }
  }
}
