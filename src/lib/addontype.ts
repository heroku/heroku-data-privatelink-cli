export default async function (addon_name: string) {
  if (addon_name.includes('postgres')) {
    return 'postgres'
  } else if (addon_name.includes('kafka')) {
    return 'kafka'
  } else if (addon_name.includes('redis')) {
    return 'redis'
  }
}
