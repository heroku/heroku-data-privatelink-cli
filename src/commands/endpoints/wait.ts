import Command, {flags} from '@heroku-cli/command'

import host from '../../lib/host'

const SHOGUN_URL = `https://${host()}/private-link/v0/databases`

export default class EndpointsWait extends Command {
  static description = 'wait for your Trusted VPC Endpoint to be provisioned'

  static args = [
    {name: 'database'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static aliases = ['pg:endpoints:wait', 'kafka:endpoints:wait', 'redis:endpoints:wait']

  static examples = [
    '$ heroku endpoints:wait',
  ]

  async run() {
    const {args} = this.parse(EndpointssWait)

    const defaultOptions = {
      headers: {
        authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
      }
    }

    const {body: res} = await this.heroku.get<any>(`${SHOGUN_URL}/${args.database}`, defaultOptions)
  }
}
