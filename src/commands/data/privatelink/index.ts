import {flags} from '@heroku-cli/command'
import * as color from '@heroku/heroku-cli-util/color'
import {styledHeader, styledObject, table} from '@heroku/heroku-cli-util/hux'
import {Args} from '@oclif/core'
import {ux} from '@oclif/core/ux'

import BaseCommand, {PrivateLinkDB} from '../../../base.js'

export default class Index extends BaseCommand {
  static args = {
    database: Args.string({required: true}),
  }
  static description = 'list all your privatelink endpoints'
  static examples = [
    '$ heroku data:privatelink postgresql-sushi-12345 --app my-app',
  ]
  static flags = {
    app: flags.app({required: true}),
    remote: flags.remote(),
  }
  static hiddenAliases = ['pg:privatelink', 'kafka:privatelink', 'redis:privatelink']
  static topic = 'data:privatelink'

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Index)
    const {app} = flags
    const database = await this.resolveAddon(args.database, app)
    const {body: res} = await this.shogun.get<PrivateLinkDB>(`/private-link/v0/databases/${database}`, this.shogun.defaults)
    const addonType = this.addonType(res.addon.name)

    if (res.status === 'Provisioning') {
      ux.stdout()
      ux.stdout(`The privatelink endpoint is now being provisioned for ${color.addon(database)}.`)
      ux.stdout(`Use ${color.command(`heroku data:privatelink:wait -a ${app}`)} to check the creation process.`)
    } else {
      styledHeader(`privatelink endpoint status for ${color.addon(database)}`)
      styledObject({
        'Service Name': res.service_name || 'Provisioning',
        Status: res.status,
      })

      if (res && res.allowed_accounts.length > 0) {
        ux.stdout()
        styledHeader('Allowed Accounts')
        table(res.allowed_accounts, {
          arn: {header: 'ARN'},
          status: {header: 'Status'},
        })
      }

      ux.stdout()
      if (res && res.connections.length > 0) {
        styledHeader('Connections')
        table(res.connections, {
          endpoint_id: {header: 'Endpoint ID'},
          owner_arn: {header: 'Owner ARN'},
          status: {header: 'Status'},
        })
      } else if (res.status === 'Operational' && res.connections.length === 0) {
        ux.stdout('Your privatelink endpoint is now operational.')
        ux.stdout(`You must now copy the ${color.green('Service Name')} and follow the rest of the steps listed in https://devcenter.heroku.com/articles/heroku-${addonType}-via-privatelink`)
      }
    }
  }

  private addonType(addonName: string): string | undefined {
    if (addonName.includes('postgres')) return 'postgres'
    if (addonName.includes('kafka')) return 'kafka'
    if (addonName.includes('redis')) return 'redis'
  }
}
