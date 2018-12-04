import Command, {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import getHost from '../../lib/host'

const SHOGUN_URL = `https://${getHost()}/private-link/v0/databases`

export default class EndpointsCreate extends Command {
  static description = 'create a Private Link for your database'

  static args = [
    {name: 'database', required: true},
    {name: 'account_ids'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:create',
  ]

  async run() {
    const {args} = this.parse(EndpointsCreate)

    let defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    cli.action.start('Creating Private Link')

    const {body: res} = await this.heroku.post<any>(`${SHOGUN_URL}/${args.database}`, {
      ...defaultOptions,
      body: {
        whitelisted_accounts: [args.aws_ids]
      }
    })

    cli.styledJSON(res)
    cli.action.stop()
  }
}
