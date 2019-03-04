import {cli} from 'cli-ux'

export default async function (heroku: any, addon_attachment: string, app: string) {
  const db = addon_attachment || 'DATABASE_URL'
  const {body: res} = await heroku.post('/actions/addon-attachments/resolve', {
    body: {
      app,
      addon_attachment: db,
      addon_service: process.env.HEROKU_ADDON_SERVICE || 'heroku-postgresql'
    }}
  )

  if (res.id !== 'not_found') {
    return res[0].addon.name
  } else {
    cli.error(res.message)
  }
}
