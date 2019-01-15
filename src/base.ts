import {Command} from '@heroku-cli/command'
import {IConfig} from '@oclif/config'

export default abstract class extends Command {
  protected constructor(argv: string[], config: IConfig) {
    super(argv, config)

    this.heroku.defaults.host = process.env.HEROKU_DATA_HOST || 'postgres-api.heroku.com'
    this.heroku.defaults.headers = {
      ...this.heroku.defaults.headers,
      authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`
    }
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
