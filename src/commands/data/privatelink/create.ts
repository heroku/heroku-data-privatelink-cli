import color from '@heroku-cli/color'
import {flags} from '@heroku-cli/command'
import {Args, ux} from '@oclif/core'
import BaseCommand, {PrivateLinkDB} from '../../../base'
import fetcher from '../../../lib/fetcher'

export default class Create extends BaseCommand {
  static description = 'create a new privatelink endpoint for your database'
  static hiddenAliases = ['pg:privatelink:create', 'kafka:privatelink:create', 'redis:privatelink:create']

  static args = {
    database: Args.string({required: true}),
  }

  static flags = {
    'aws-account-id': flags.string({
      char: 'i',
      description: 'AWS account id to use',
      required: true,
      multiple: true,
    }),
    app: flags.app({required: true}),
    remote: flags.remote(),
  }

  static examples = [
    '$ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --app my-app',
    '$ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --account-id 123456789012:user/xyz --app my-app',
  ]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Create)
    const database = await fetcher(this.heroku, args.database, flags.app)
    const {'aws-account-id': account_ids, app} = flags

    ux.action.start('Creating privatelink endpoint')
    const {body: res} = await this.shogun.post<PrivateLinkDB>(`/private-link/v0/databases/${database}`, {
      ...this.shogun.defaults,
      body: {
        allowed_accounts: account_ids,
      },
    })
    ux.action.stop()
    ux.log()
    ux.styledObject({
      Status: res.status,
      'Service Name': res.service_name || 'Provisioning',
    })

    ux.log()
    ux.log(`The privatelink endpoint is now being provisioned for ${color.green(database)}.`)
    ux.log('Run ' + color.cmd('heroku data:privatelink:wait ' + database + ' --app ' + app) +
      ' to check the creation process.')
  }
}
