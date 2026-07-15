import {APIClient, Command} from '@heroku-cli/command'
import {AddonResolver} from '@heroku/heroku-cli-util/utils/addons'
import {Config} from '@oclif/core'
import {OutgoingHttpHeaders} from 'node:http'

export default abstract class BaseCommand extends Command {
  shogun: APIClient

  public constructor(argv: string[], config: Config) {
    super(argv, config)

    const client = new APIClient(this.config, {})
    client.defaults.host = process.env.HEROKU_DATA_HOST || 'api.data.heroku.com'
    client.defaults.headers = {
      ...this.heroku.defaults.headers,
      authorization: `Basic ${Buffer.from(':' + this.heroku.auth).toString('base64')}`,
    } as OutgoingHttpHeaders
    this.shogun = client
  }

  protected async resolveAddon(addon: string, app: string): Promise<string> {
    const resolved = await new AddonResolver(this.heroku).resolve(addon, app)
    return resolved.name
  }
}

export interface PrivateLinkDB {
  addon: {name: string},
  allowed_accounts: {arn: string, status: string}[],
  apps: {name: string},
  connections: {endpoint_id: string, owner_arn: string, status: string}[],
  service_name: string,
  status: string,
}
