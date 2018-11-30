import Command, {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import getHost from '../../lib/get-host'

const SHOGUN_URL = `https://${getHost()}/private-link/v0/databases`

export default class PrivateLinksDestroy extends Command {
  static description = 'get information on the status of your Private Link'

  static args = [
    {name: 'database'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku privatelinks:destroy',
  ]

  async run() {
    const {args} = this.parse(PrivateLinksDestroy)

    const defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    const res = await this.heroku.delete<any>(`${SHOGUN_URL}/${args.database}`, defaultOptions)

    cli.styledJSON(res)
  }
}
