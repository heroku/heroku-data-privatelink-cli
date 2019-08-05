import {AddOn} from '@heroku-cli/schema'
import {cli} from 'cli-ux'

export default async function (heroku: any, addon_attachment: string, app: string) {
  const db = addon_attachment
  const {body: res} = await heroku.post('/actions/addons/resolve', {
    body: {
      app,
      addon: db
    }}
  )

  if (res.id === 'not_found') {
    cli.error(res.message)
  }

  const filteredAddon = res.find((addon: AddOn) => {
    if (addon.addon_service) {
      return addon.addon_service.name && addon.addon_service.name.startsWith('heroku-')
    }
  })

  if (filteredAddon) {
    return filteredAddon.name
  } else {
    cli.error('No addons found')
  }
}
