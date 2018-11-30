import Command, {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import getHost from '../../../lib/get-host'

const SHOGUN_URL = `https://${getHost()}/private-link/v0/databases`

export default class PrivateLinksAccessRemove extends Command {
  static description = 'get information on the status of your Private Link'

  static args = [
    {name: 'database'},
    {name: 'aws_arn'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku privatelinks:access:remove arn:aws:iam::12345678910:root',
  ]

  async run() {
    const {args} = this.parse(PrivateLinksAccessRemove)

    const defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    await this.heroku.delete<any>(`${SHOGUN_URL}/${args.database}/whitelisted_accounts/${args.aws_arn}`, defaultOptions)
    cli.done()
  }
}
