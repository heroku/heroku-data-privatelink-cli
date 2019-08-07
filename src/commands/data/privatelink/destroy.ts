import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand, {PrivateLinkDB} from '../../../base'
import fetcher from '../../../lib/fetcher'

export default class EndpointsDestroy extends BaseCommand {
  static description = 'destroy a privatelink endpoint for your database'
  static aliases = ['pg:privatelink:destroy', 'kafka:privatelink:destroy', 'redis:privatelink:destroy']

  static args = [
    {name: 'database'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku data:privatelink:destroy postgresql-sushi-12345',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsDestroy)
    const database = await fetcher(this.heroku, args.database, flags.app)

    cli.action.start('Destroying privatelink endpoint')
    await this.shogun.delete<PrivateLinkDB>(`/private-link/v0/databases/${database}`, this.shogun.defaults)
    cli.action.stop()
  }
}
