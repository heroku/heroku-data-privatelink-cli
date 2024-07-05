let nock = require('nock')

nock.disableNetConnect()
if (process.env.ENABLE_NET_CONNECT === 'true') {
  nock.enableNetConnect()
}

const chai = require('chai')
chai.use(require('chai-as-promised'))
