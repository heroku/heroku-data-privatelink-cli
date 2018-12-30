import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand from '../../base'
import host from '../../lib/host'

const SHOGUN_URL = `https://${host()}/private-link/v0/databases`

export default class EndpointssDestroy extends BaseCommand {
  static description = 'destroy a Trusted VPC Endpoint for your database'

  static args = [
    {name: 'database', required: true}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:destroy',
  ]

  async run() {
    const {args} = this.parse(EndpointssDestroy)

    cli.action.start('Destroying Trusted VPC Endpoint')
    await this.heroku.delete<any>(`${SHOGUN_URL}/${args.database}`, this.heroku.defaults)
    cli.action.stop()
  }
}
