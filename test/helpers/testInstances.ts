import {Config} from '@oclif/core'

export const getConfig = async () => {
  const pjsonPath = require.resolve('../../package.json')
  const conf = new Config({root: pjsonPath})
  await conf.load()
  return conf
}
