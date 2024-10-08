import {APIClient, Command} from '@heroku-cli/command'
import {Config} from '@oclif/core'

export default abstract class extends Command {
  shogun: APIClient

  public constructor(argv: string[], config: Config) {
    super(argv, config)

    const client = new APIClient(this.config, {})
    client.defaults.host = process.env.HEROKU_DATA_HOST || 'api.data.heroku.com'
    client.defaults.headers = {
      ...this.heroku.defaults.headers,
      authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`,
    }
    this.shogun = client
  }
}

export interface PrivateLinkDB {
  apps: { name: string },
  addon: { name: string },
  status: string,
  service_name: string,
  allowed_accounts: { arn: string, status: string }[],
  connections: { endpoint_id: string, owner_arn: string, status: string }[],
}
