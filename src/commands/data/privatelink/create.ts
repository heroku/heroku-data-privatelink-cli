import {flags} from '@heroku-cli/command'
import * as color from '@heroku/heroku-cli-util/color'
import {styledObject} from '@heroku/heroku-cli-util/hux'
import {Args, ux} from '@oclif/core'

import BaseCommand, {PrivateLinkDB} from '../../../base.js'

export default class Create extends BaseCommand {
  static args = {
    database: Args.string({required: true}),
  }
  static description = 'create a new privatelink endpoint for your database'
  static examples = [
    '$ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --app my-app',
    '$ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app',
  ]
  static flags = {
    app: flags.app({required: true}),
    'aws-account-id': flags.string({
      char: 'i',
      description: 'AWS account id to use',
      multiple: true,
      required: true,
    }),
    remote: flags.remote(),
  }
  static hiddenAliases = ['pg:privatelink:create', 'kafka:privatelink:create', 'redis:privatelink:create']

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Create)
    const database = await this.resolveAddon(args.database, flags.app)
    const {app, 'aws-account-id': accountIds} = flags

    ux.action.start('Creating privatelink endpoint')
    const {body: res} = await this.shogun.post<PrivateLinkDB>(`/private-link/v0/databases/${database}`, {
      ...this.shogun.defaults,
      body: {
        allowed_accounts: accountIds,
      },
    })
    ux.action.stop()
    ux.stdout()
    styledObject({
      'Service Name': res.service_name || 'Provisioning',
      Status: res.status,
    })

    ux.stdout()
    ux.stdout(`The privatelink endpoint is now being provisioned for ${color.addon(database)}.`)
    ux.stdout('Use ' + color.command('heroku data:privatelink:wait ' + database + ' --app ' + app)
      + ' to check the creation process.')
  }
}
