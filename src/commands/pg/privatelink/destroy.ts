import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand, {PrivateLinkDB} from '../../../base'
import fetcher from '../../../lib/fetcher'

export default class EndpointsDestroy extends BaseCommand {
  static description = 'destroy a privatelink endpoint for your database'

  static args = [
    {name: 'database'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku pg:privatelink:destroy postgresql-sushi-12345',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsDestroy)
    const database = args.database || await fetcher(this.heroku, flags.app)

    cli.action.start('Destroying privatelink endpoint')
    await this.heroku.delete<PrivateLinkDB>(`/private-link/v0/databases/${database}`, this.heroku.defaults)
    cli.action.stop()
  }
}
