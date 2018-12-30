import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand from '../../base'
import fetcher from '../../lib/fetcher'

export default class EndpointsDestroy extends BaseCommand {
  static description = 'destroy a Trusted VPC Endpoint for your database'

  static args = [
    {name: 'database'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:destroy',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsDestroy)
    const database = args.database || await fetcher(this.heroku, flags.app)

    cli.action.start('Destroying Trusted VPC Endpoint')
    await this.heroku.delete<any>(`/private-link/v0/databases/${database}`, this.heroku.defaults)
    cli.action.stop()
  }
}
