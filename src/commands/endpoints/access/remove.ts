import Command, {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import getHost from '../../../lib/host'

const SHOGUN_URL = `https://${getHost()}/private-link/v0/databases`

export default class EndpointsAccessRemove extends Command {
  static description = 'remove an account from your whitelist'

  static args = [
    {name: 'database'},
    {name: 'aws_arn'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku endpoints:access:remove arn:aws:iam::12345678910:root',
  ]

  async run() {
    const {args} = this.parse(EndpointsAccessRemove)

    const defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    await this.heroku.delete<any>(`${SHOGUN_URL}/${args.database}/whitelisted_accounts/${args.aws_arn}`, defaultOptions)
    cli.done()
  }
}
