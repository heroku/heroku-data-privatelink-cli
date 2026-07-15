export const addonsFetcherResponse = [
  {
    actions: [
      {
        action: null,
        id: 'dc0af4a6-9ce6-47bb-aa5f-87f32212786a',
        label: 'Create Dataclip',
        requires_owner: null,
        url: 'https://dataclip.heroku.com',
      },
      {
        action: null,
        id: '457ad119-2e8d-4ed3-b7c5-0994cfbbd1f3',
        label: 'Upgrade instructions',
        requires_owner: null,
        url: 'https://devcenter.heroku.com/articles/upgrading-heroku-postgres-databases',
      },
    ],
    addon_service: {
      id: 'af5cb32e-0cac-4ccc-b88b-598ca78adc19',
      name: 'heroku-postgresql',
    },
    app: {
      id: '1879136a-cc51-428f-b59b-2dee3cd5193b',
      name: 'myapp',
    },
    billed_price: {
      cents: 30_000,
      contract: false,
      unit: 'month',
    },
    billing_entity: {
      id: '1879136a-cc51-428f-b59b-2dee3cd5193b',
      name: 'myapp',
      type: 'app',
    },
    created_at: '2019-03-08T17:37:10Z',
    id: '912ce943-9b8d-4135-a147-f745c3a2c4a3',
    name: 'postgres-123',
    plan: {
      id: '592e4709-ee76-4676-82df-2b0356b7c954',
      name: 'heroku-postgresql:private-0',
    },
    provider_id: 'resource12345@heroku.com',
    state: 'provisioned',
    updated_at: '2019-04-01T10:45:28Z',
    web_url: 'https://addons-sso.heroku.com/apps/1879136a-cc51-428f-b59b-2dee3cd5193b/addons/af5cb32e-0cac-4ccc-b88b-598ca78adc19',
  },
]

export const privateLinkNewlyCreated = {
  addon: {name: 'postgres-123'},
  allowed_accounts: [],
  app: {name: 'myapp'},
  connections: [],
  service_name: 'com.amazonaws.vpce.testvpc',
  status: 'Provisioning',
}

export const privateLinkOperational = {
  ...privateLinkNewlyCreated,
  status: 'Operational',
}

export const privateLinkKafkaOperational = {
  ...privateLinkOperational,
  addon: {name: 'kafka-123'},
}

export const privateLinkWithConnections = {
  ...privateLinkOperational,
  allowed_accounts: [
    {arn: 'arn:aws:iam::12345567890:root', status: 'Active'},
  ],
  connections: [
    {endpoint_id: '123456', owner_arn: 'arn:aws:iam::12345567890:root', status: 'Available'},
  ],
}
