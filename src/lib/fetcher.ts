import {cli} from 'cli-ux'

export default async function (heroku: any, app: string) {
  const {body: addons} = await heroku.get(`https://api.heroku.com/apps/${app}/addons`)
  const postgres_addons = addons.filter((addon: any) => addon.addon_service.name.includes('heroku-postgresql'))
  if (postgres_addons.length === 1) {
    return postgres_addons[0].name
  } else if (postgres_addons.length > 1) {
    cli.error(`found more than one Heroku Postgres add-on on ${app}: ${postgres_addons.map((addon: any) => addon.name).join(', ')}`, {exit: 1})
  } else {
    cli.error(`found no Heroku Postgres add-ons on ${app}`, {exit: 1})
  }
}
