import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand, {PrivateLinkDB} from '../../../base'
import fetcher from '../../../lib/fetcher'

export default class EndpointsWait extends BaseCommand {
  static description = 'wait for your privatelink endpoint to be provisioned'

  static args = [
    {name: 'database'}
  ]

  static flags = {
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku pg:privatelink:wait postgresql-sushi-12345',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsWait)
    const database = args.database || await fetcher(this.shogun, flags.app)

    let status
    cli.action.start('Waiting for the privatelink endpoint to be provisioned')
    while (status !== 'Operational') {
      let {body: res} = await this.shogun.get<PrivateLinkDB>(`/private-link/v0/databases/${database}`, this.shogun.defaults)
      status = res.status
      await cli.wait(3000)
    }
    cli.action.stop()
  }
}
