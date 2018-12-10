import {expect, test} from '@oclif/test'

describe('endpoints:create', () => {
  it('creates new trusted VPC endpoint with permissions') {
    test
      .stdout()
      .command(['hello'])
      .it('runs hello', ctx => {
        expect(ctx.stdout).to.contain('hello world')
      })
  }
})
