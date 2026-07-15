import herokuConfig from '@heroku-cli/test-utils/eslint-config'

export default [
  ...herokuConfig,
  {
    rules: {
      // The Heroku Platform and privatelink APIs use snake_case on the wire.
      // Enforce camelCase on our own identifiers, but allow snake_case object
      // properties so request/response bodies match the API contract verbatim.
      camelcase: ['error', {properties: 'never'}],
    },
  },
]
