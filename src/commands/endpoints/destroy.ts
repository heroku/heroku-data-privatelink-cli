import Command, {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import host from '../../lib/host'

const SHOGUN_URL = `https://${host()}/private-link/v0/databases`

export default class EndpointssDestroy extends Command {
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

    const defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    cli.action.start('Destroying Trusted VPC Endpoint')
    await this.heroku.delete<any>(`${SHOGUN_URL}/${args.database}`, defaultOptions)
    cli.action.stop()
  }
}
