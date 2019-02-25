export const addonsFetcherResponse = [
  {
    addon: {
      id: '68ac478b-257c-4b0c-a2bf-b29b115486cd',
      name: 'postgres-123',
      app: {
        id: '097c056a-8d45-4f18-9501-05e8708652c0',
        name: 'myapp'
      }
    },
    app: {
      id: '097c056a-8d45-4f18-9501-05e8708652c0',
      name: 'myapp'
    },
    id: '2e2805c2-1aa7-4fed-9e4d-a54d24d50992',
    name: 'HEROKU_POSTGRESQL_PINK',
    namespace: null,
    created_at: '2019-02-08T18:31:31Z',
    updated_at: '2019-02-08T18:31:31Z',
    web_url: 'https://addons-sso.heroku.com/apps/fe3c96b2-f839-4efa-a708-06c26c7407cc/addons/68ac478b-257c-4b0c-a2bf-b29b115486cd',
    log_input_url: null
  }
]

export const privateLinkNewlyCreated = {
  app: {name: 'myapp'},
  addon: {name: 'postgres-123'},
  status: 'Provisioning',
  service_name: 'com.amazonaws.vpce.testvpc',
  connections: [],
  whitelisted_accounts: []
}

export const privateLinkOperational = {
  ...privateLinkNewlyCreated,
  status: 'Operational',
}

export const privateLinkWithConnections = {
  ...privateLinkOperational,
  connections: [
    {endpoint_id: '123456', owner_arn: 'arn:aws:iam::12345567890:root', status: 'Available'}
  ],
  whitelisted_accounts: [
    {arn: 'arn:aws:iam::12345567890:root', status: 'Active'}
  ]
}
