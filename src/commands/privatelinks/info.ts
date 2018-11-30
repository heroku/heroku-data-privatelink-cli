import Command, {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import getHost from '../../lib/get-host'

const SHOGUN_URL = `https://${getHost()}/private-link/v0/databases`

export default class PrivateLinksInfo extends Command {
  static description = 'get information on the status of your Private Link'

  static args = [
    {name: 'database'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku privatelinks',
  ]

  async run() {
    const {args} = this.parse(PrivateLinksInfo)

    const defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    const {body: connections} = await this.heroku.get<any>(`${SHOGUN_URL}/${args.database}`, defaultOptions)

    cli.table(connections)
  }
}
