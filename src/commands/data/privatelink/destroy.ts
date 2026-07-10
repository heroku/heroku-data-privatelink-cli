import {flags} from '@heroku-cli/command'
import {Args} from '@oclif/core'
import {ux} from '@oclif/core/ux'

import BaseCommand, {PrivateLinkDB} from '../../../base.js'

export default class Destroy extends BaseCommand {
  static args = {
    database: Args.string({required: true}),
  }
  static description = 'destroy a privatelink endpoint for your database'
  static examples = [
    '$ heroku data:privatelink:destroy postgresql-sushi-12345 --app my-app',
  ]
  static flags = {
    app: flags.app({required: true}),
    remote: flags.remote(),
  }
  static hiddenAliases = ['pg:privatelink:destroy', 'kafka:privatelink:destroy', 'redis:privatelink:destroy']

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Destroy)
    const database = await this.resolveAddon(args.database, flags.app)

    ux.action.start('Destroying privatelink endpoint')
    await this.shogun.delete<PrivateLinkDB>(`/private-link/v0/databases/${database}`, this.shogun.defaults)
    ux.action.stop()
  }
}
