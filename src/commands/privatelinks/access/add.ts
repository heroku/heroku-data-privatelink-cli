import Command, {flags} from '@heroku-cli/command'

import getHost from '../../../lib/get-host'

const SHOGUN_URL = `https://${getHost()}/private-link/v0/databases`

export default class PrivateLinksAccessAdd extends Command {
  static description = 'get information on the status of your Private Link'

  static args = [
    {name: 'database'},
    {name: 'aws_ids'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku privatelinks:access:add 123456',
    '$ heroku privatelinks:access:add 123456,7891011',
  ]

  async run() {
    const {args} = this.parse(PrivateLinksAccessAdd)

    let defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    await this.heroku.put<any>(`${SHOGUN_URL}/${args.database}/whitelisted_accounts`, {
      ...defaultOptions,
      body: {
        whitelisted_accounts: [args.aws_arns]
      }
    })
  }
}
