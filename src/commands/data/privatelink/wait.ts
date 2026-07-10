import {flags} from '@heroku-cli/command'
import {wait} from '@heroku/heroku-cli-util/hux'
import {Args} from '@oclif/core'
import {ux} from '@oclif/core/ux'

import BaseCommand, {PrivateLinkDB} from '../../../base.js'

export default class Wait extends BaseCommand {
  static args = {
    database: Args.string({required: true}),
  }
  static description = 'wait for your privatelink endpoint to be provisioned'
  static examples = [
    '$ heroku data:privatelink:wait postgresql-sushi-12345 --app my-app',
  ]
  static flags = {
    app: flags.app({required: true}),
    remote: flags.remote(),
  }
  static hiddenAliases = ['pg:privatelink:wait', 'kafka:privatelink:wait', 'redis:privatelink:wait']

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Wait)
    const database = await this.resolveAddon(args.database, flags.app)

    let status
    ux.action.start('Waiting for the privatelink endpoint to be provisioned')
    // Sequential polling: each check must wait for the previous request and delay.
    /* eslint-disable no-await-in-loop */
    while (status !== 'Operational') {
      const {body: res} = await this.shogun.get<PrivateLinkDB>(`/private-link/v0/databases/${database}`, this.shogun.defaults)
      status = res.status
      await wait(3000)
    }
    /* eslint-enable no-await-in-loop */

    ux.action.stop()
  }
}
