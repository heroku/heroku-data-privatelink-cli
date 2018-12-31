import {expect, test} from '../../test'

describe('endpoints', () => {
  const privateLinkNewlyCreated = {
    app: {name: 'myapp'},
    addon: {name: 'postgres-123'},
    status: 'Provisioning',
    service_name: 'com.amazonaws.vpce.testvpc"',
    connections: [],
    whitelisted_accounts: []
  }

  const privateLinkOperational = {
    ...privateLinkNewlyCreated,
    status: 'Operational',
  }

  const privateLinkWithConnections = {
    ...privateLinkOperational,
    connections: [
      {endpoint_id: '123456', owner_arn: 'arn:aws:iam::12345567890:root', status: 'Available'}
    ],
    whitelisted_accounts: [
      {arn: 'arn:aws:iam::12345567890:root', status: 'Active'}
    ]
  }

  test
    .nock('https://postgres-api.heroku.com', api => api
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkWithConnections)
    )
    .stdout()
    .stderr()
    .command(['endpoints', 'postgres-123', '--app', 'myapp'])
    .it('shows the status of a trusted VPC endpoint, inc. whitelist and connections', ctx => {
      expect(ctx.stdout).to.contain('=== Trusted VPC Endpoint status for postgres-123')
      expect(ctx.stdout).to.contain('Service Name: com.amazonaws.vpce.testvpc')
      expect(ctx.stdout).to.contain('Status:       Operational')

      expect(ctx.stdout).to.contain('Whitelisted Accounts')
      expect(ctx.stdout).to.contain('ARN                           Status')
      expect(ctx.stdout).to.contain('arn:aws:iam::12345567890:root Active')

      expect(ctx.stdout).to.contain('Connections')
      expect(ctx.stdout).to.contain('Endpoint ID Owner ARN                     Status ')
      expect(ctx.stdout).to.contain('123456      arn:aws:iam::12345567890:root Available')
    })

  test
    .nock('https://postgres-api.heroku.com', api => api
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkNewlyCreated)
    )
    .stdout()
    .stderr()
    .command(['endpoints', 'postgres-123', '--app', 'myapp'])
    .it('tells the user to run heroku endpoints:wait for a newly created endpoint', ctx => {
      expect(ctx.stdout).to.contain('The Trusted VPC Endpoint is now being provisioned for postgres-123.')
      expect(ctx.stdout).to.contain('Run heroku endpoints:wait to check the creation process.')
    })
})
