import Command, {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import getHost from '../../lib/host'

const SHOGUN_URL = `https://${getHost()}/private-link/v0/databases`

export default class EndpointsDestroy extends Command {
  static description = 'destroy a Private Link for your database'

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
    const {args} = this.parse(EndpointsDestroy)

    const defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    const res = await this.heroku.delete<any>(`${SHOGUN_URL}/${args.database}`, defaultOptions)

    cli.styledJSON(res)
  }
}
