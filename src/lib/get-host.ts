export default function () {
  return process.env.HEROKU_DATA_HOST || 'postgres-api.heroku.com'
}
