import {flags} from '@heroku-cli/command'
import {Args, ux} from '@oclif/core'
import BaseCommand, {PrivateLinkDB} from '../../../base'
import fetcher from '../../../lib/fetcher'

export default class Destroy extends BaseCommand {
  static description = 'destroy a privatelink endpoint for your database'
  static hiddenAliases = ['pg:privatelink:destroy', 'kafka:privatelink:destroy', 'redis:privatelink:destroy']

  static args = {
    database: Args.string({required: true}),
  }

  static flags = {
    app: flags.app({required: true}),
    remote: flags.remote(),
  }

  static examples = [
    '$ heroku data:privatelink:destroy postgresql-sushi-12345 --app my-app',
  ]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Destroy)
    const database = await fetcher(this.heroku, args.database, flags.app)

    ux.action.start('Destroying privatelink endpoint')
    await this.shogun.delete<PrivateLinkDB>(`/private-link/v0/databases/${database}`, this.shogun.defaults)
    ux.action.stop()
  }
}
