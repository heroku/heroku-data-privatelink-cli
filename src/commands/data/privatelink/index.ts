import color from '@heroku-cli/color'
import {flags} from '@heroku-cli/command'
import {Args, ux} from '@oclif/core'
import BaseCommand, {PrivateLinkDB} from '../../../base'
import fetcher from '../../../lib/fetcher'

export default class Index extends BaseCommand {
  static topic = 'data:privatelink'
  static description = 'list all your privatelink endpoints'
  static hiddenAliases = ['pg:privatelink', 'kafka:privatelink', 'redis:privatelink']

  static args = {
    database: Args.string({required: true}),
  }

  static flags = {
    app: flags.app({required: true}),
    remote: flags.remote(),
  }

  static examples = [
    '$ heroku data:privatelink postgresql-sushi-12345 -a my-app',
  ]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Index)
    const {app} = flags
    const database = await fetcher(this.heroku, args.database, app)
    const {body: res} = await this.shogun.get<PrivateLinkDB>(`/private-link/v0/databases/${database}`, this.shogun.defaults)
    const addonType = this.addonType(res.addon.name)

    if (res.status === 'Provisioning') {
      ux.log()
      ux.log(`The privatelink endpoint is now being provisioned for ${color.green(database)}.`)
      ux.log(`Run ${color.cmd(`heroku data:privatelink:wait -a ${app}`)} to check the creation process.`)
    } else {
      ux.styledHeader(`privatelink endpoint status for ${color.green(database)}`)
      ux.styledObject({
        Status: res.status,
        'Service Name': res.service_name || 'Provisioning',
      })

      if (res && res.allowed_accounts.length > 0) {
        ux.log()
        ux.styledHeader('Allowed Accounts')
        ux.table(res.allowed_accounts, {
          arn: {header: 'ARN'},
          status: {},
        })
      }

      ux.log()
      if (res && res.connections.length > 0) {
        ux.styledHeader('Connections')
        ux.table(res.connections, {
          endpoint_id: {header: 'Endpoint ID'},
          owner_arn: {header: 'Owner ARN'},
          status: {},
        })
      } else if (res.status === 'Operational' && res.connections.length === 0) {
        ux.log('Your privatelink endpoint is now operational.')
        ux.log(`You must now copy the ${color.green('Service Name')} and follow the rest of the steps listed in https://devcenter.heroku.com/articles/heroku-${addonType}-via-privatelink`)
      }
    }
  }

  private addonType(addon_name: string): string | undefined {
    if (addon_name.includes('postgres')) return 'postgres'
    if (addon_name.includes('kafka')) return 'kafka'
    if (addon_name.includes('redis')) return 'redis'
  }
}
