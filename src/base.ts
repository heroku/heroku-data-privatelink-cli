import {APIClient, Command} from '@heroku-cli/command'
import {IConfig} from '@oclif/config'
import * as url from 'url'

export default abstract class extends Command {
  shogun: APIClient

  protected constructor(argv: string[], config: IConfig) {
    super(argv, config)

    const client = new APIClient(this.config, {})
    const host = process.env.HEROKU_ADDONS_HOST
    client.defaults.host = host ? url.parse(host).host : 'postgres-api.heroku.com'
    client.defaults.headers = {
      ...this.heroku.defaults.headers,
      authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
    }
    this.shogun = client
  }
}

export interface PrivateLinkDB {
  apps: {name: string},
  addon: {name: string},
  status: string,
  service_name: string,
  whitelisted_accounts: {arn: string, status: string}[],
  connections: {endpoint_id: string, owner_arn: string, status: string}[],
}
