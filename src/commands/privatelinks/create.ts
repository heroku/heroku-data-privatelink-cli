import Command, {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import getHost from '../../lib/get-host'

const SHOGUN_URL = `https://${getHost()}/private-link/v0/databases`

export default class PrivateLinksCreate extends Command {
  static description = 'get information on the status of your Private Link'

  static args = [
    {name: 'database'},
    {name: 'aws_ids'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku privatelinks:create',
  ]

  async run() {
    const {args} = this.parse(PrivateLinksCreate)

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
