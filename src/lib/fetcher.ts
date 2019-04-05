import {AddOn} from '@heroku-cli/schema'
import {cli} from 'cli-ux'

export default async function (heroku: any, addon_attachment: string, app: string) {
  const db = addon_attachment || 'DATABASE_URL'
  const {body: res} = await heroku.post('/actions/addons/resolve', {
    body: {
      app,
      addon: db
    }}
  )

  if (res.id === 'not_found') {
    cli.error(res.message)
  }

  const filteredDb = res.find((addon: AddOn) => addon.addon_service && addon.addon_server.name.startsWith('heroku-postgresql'))

  if (filteredDb) {
    return filteredDb.name
  } else {
    cli.error('No databases found')
  }
}
