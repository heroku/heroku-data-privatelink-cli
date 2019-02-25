import {addonsFetcherResponse,
  privateLinkNewlyCreated,
  privateLinkWithConnections} from '../../../fixtures'
import {expect, test} from '../../../test'

describe('privatelink', () => {
  test
    .nock('https://postgres-api.heroku.com', api => api
      .get('/private-link/v0/databases/postgres-123')
      .reply(200, privateLinkWithConnections)
    )
    .nock('https://api.heroku.com', api => api
      .post('/actions/addon-attachments/resolve')
      .reply(200, addonsFetcherResponse)
    )
    .stdout()
    .stderr()
    .command(['pg:privatelink', 'postgres-123', '--app', 'myapp'])
    .it('shows the status of a privatelink endpoint, inc. whitelist and connections', ctx => {
      expect(ctx.stdout).to.contain('=== privatelink endpoint status for postgres-123')
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
    .nock('https://api.heroku.com', api => api
      .post('/actions/addon-attachments/resolve')
      .reply(200, addonsFetcherResponse)
    )
    .stdout()
    .stderr()
    .command(['pg:privatelink', 'postgres-123', '--app', 'myapp'])
    .it('tells the user to run heroku pg:privatelink:wait for a newly created endpoint', ctx => {
      expect(ctx.stdout).to.contain('The privatelink endpoint is now being provisioned for postgres-123.')
      expect(ctx.stdout).to.contain('Run heroku pg:privatelink:wait -a APP to check the creation process.')
    })
})
