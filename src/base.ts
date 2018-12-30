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
