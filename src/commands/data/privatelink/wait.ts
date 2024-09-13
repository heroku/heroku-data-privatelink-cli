import {flags} from '@heroku-cli/command'
import {Args, ux} from '@oclif/core'
import BaseCommand, {PrivateLinkDB} from '../../../base'
import fetcher from '../../../lib/fetcher'

export default class Wait extends BaseCommand {
  static description = 'wait for your privatelink endpoint to be provisioned'
  static hiddenAliases = ['pg:privatelink:wait', 'kafka:privatelink:wait', 'redis:privatelink:wait']

  static args = {
    database: Args.string({required: true}),
  }

  static flags = {
    app: flags.app({required: true}),
    remote: flags.remote(),
  }

  static examples = [
    '$ heroku data:privatelink:wait postgresql-sushi-12345 postgresql-sushi-12345 --app my-app',
  ]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Wait)
    const database = await fetcher(this.heroku, args.database, flags.app)

    let status
    ux.action.start('Waiting for the privatelink endpoint to be provisioned')
    while (status !== 'Operational') {
      const {body: res} = await this.shogun.get<PrivateLinkDB>(`/private-link/v0/databases/${database}`, this.shogun.defaults)
      status = res.status
      await ux.wait(3000)
    }

    ux.action.stop()
  }
}
