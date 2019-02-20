import color from '@heroku-cli/color'
import {flags} from '@heroku-cli/command'
import {cli} from 'cli-ux'

import BaseCommand, {PrivateLinkDB} from '../../../base'
import fetcher from '../../../lib/fetcher'

export default class EndpointsCreate extends BaseCommand {
  static description = 'create a new privatelink endpoint for your database'

  static args = [
    {name: 'database'},
  ]

  static flags = {
    'aws-account-id': flags.build({
      char: 'i',
      description: 'AWS account id to use',
      parse: (input: string, ctx: any) => {
        if (!ctx.endpoints_create_ids) ctx.endpoints_create_ids = []
        ctx.endpoints_create_ids.push(input)
        return ctx.endpoints_create_ids
      },
    })(),
    app: flags.app({required: true})
  }

  static examples = [
    '$ heroku pg:privatelink:create postgresql-sushi-12345 --account-id 123456789012:user/abc',
    '$ heroku pg:privatelink:create postgresql-sushi-12345 --account-id 123456789012:user/abc --account-id 123456789012:user/xyz',
  ]

  async run() {
    const {args, flags} = this.parse(EndpointsCreate)
    const database = args.database || await fetcher(this.heroku, flags.app)
    const account_ids = flags['aws-account-id']

    cli.action.start('Creating privatelink endpoint')
    const {body: res} = await this.heroku.post<PrivateLinkDB>(`/private-link/v0/databases/${database}`, {
      ...this.heroku.defaults,
      body: {
        whitelisted_accounts: account_ids
      }
    })
    cli.action.stop()
    this.log()
    cli.styledObject({
      Status: res.status,
      'Service Name': res.service_name || 'Provisioning'
    })

    this.log()
    this.log(`The privatelink endpoint is now being provisioned for ${color.cyan(database)}.`)
    this.log(`Run ${color.cyan('heroku pg:privatelink:wait --app APP')} to check the creation process.`)
  }
}