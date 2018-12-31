heroku-endpoints-cli
=======================

heroku endpoints CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/heroku-endpoints-cli.svg)](https://npmjs.org/package/heroku-privatelinks-cli)
[![Downloads/week](https://img.shields.io/npm/dw/heroku-endpoints-cli.svg)](https://npmjs.org/package/heroku-privatelinks-cli)
[![License](https://img.shields.io/npm/l/heroku-endpoints-cli.svg)](https://github.com/brettgoulder/heroku-endpoints-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @heroku-cli/plugin-trusted-endpoints
$ heroku COMMAND
running command...
$ heroku (-v|--version|version)
@heroku-cli/plugin-trusted-endpoints/0.3.0 darwin-x64 node-v10.14.0
$ heroku --help [COMMAND]
USAGE
  $ heroku COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`heroku endpoints [DATABASE]`](#heroku-endpoints-database)
* [`heroku endpoints:access [DATABASE]`](#heroku-endpointsaccess-database)
* [`heroku endpoints:access:add [DATABASE]`](#heroku-endpointsaccessadd-database)
* [`heroku endpoints:access:remove [DATABASE]`](#heroku-endpointsaccessremove-database)
* [`heroku endpoints:create [DATABASE]`](#heroku-endpointscreate-database)
* [`heroku endpoints:destroy [DATABASE]`](#heroku-endpointsdestroy-database)
* [`heroku endpoints:wait [DATABASE]`](#heroku-endpointswait-database)

## `heroku endpoints [DATABASE]`

list all your Trusted VPC Endpoints

```
USAGE
  $ heroku endpoints [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku endpoints
```

_See code: [src/commands/endpoints/index.ts](https://github.com/heroku/heroku-endpoints-cli/blob/v0.3.0/src/commands/endpoints/index.ts)_

## `heroku endpoints:access [DATABASE]`

list all accounts for your Trusted VPC Endpoint's whitelist

```
USAGE
  $ heroku endpoints:access [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku endpoints:access postgresql-rigid-37567
```

_See code: [src/commands/endpoints/access/index.ts](https://github.com/heroku/heroku-endpoints-cli/blob/v0.3.0/src/commands/endpoints/access/index.ts)_

## `heroku endpoints:access:add [DATABASE]`

add an account to your Trusted VPC Endpoints's whitelist

```
USAGE
  $ heroku endpoints:access:add [DATABASE]

OPTIONS
  -a, --app=app              (required) app to run command against
  --account_ids=account_ids  (required)

EXAMPLES
  $ heroku endpoints:access:add postgresql-rigid-37567 --account_ids 123456
  $ heroku endpoints:access:add postgresql-rigid-37567 --account_ids 123456,78910
```

_See code: [src/commands/endpoints/access/add.ts](https://github.com/heroku/heroku-endpoints-cli/blob/v0.3.0/src/commands/endpoints/access/add.ts)_

## `heroku endpoints:access:remove [DATABASE]`

remove an account from your Trusted VPC Endpoint's whitelist

```
USAGE
  $ heroku endpoints:access:remove [DATABASE]

OPTIONS
  -a, --app=app              (required) app to run command against
  --account_ids=account_ids  (required)

EXAMPLE
  $ heroku endpoints:access:remove --account_ids arn:aws:iam::12345678910:root
```

_See code: [src/commands/endpoints/access/remove.ts](https://github.com/heroku/heroku-endpoints-cli/blob/v0.3.0/src/commands/endpoints/access/remove.ts)_

## `heroku endpoints:create [DATABASE]`

create a new Trusted VPC Endpoint for your database

```
USAGE
  $ heroku endpoints:create [DATABASE]

OPTIONS
  -a, --app=app              (required) app to run command against
  --account_ids=account_ids  (required)

EXAMPLE
  $ heroku endpoints:create
```

_See code: [src/commands/endpoints/create.ts](https://github.com/heroku/heroku-endpoints-cli/blob/v0.3.0/src/commands/endpoints/create.ts)_

## `heroku endpoints:destroy [DATABASE]`

destroy a Trusted VPC Endpoint for your database

```
USAGE
  $ heroku endpoints:destroy [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku endpoints:destroy
```

_See code: [src/commands/endpoints/destroy.ts](https://github.com/heroku/heroku-endpoints-cli/blob/v0.3.0/src/commands/endpoints/destroy.ts)_

## `heroku endpoints:wait [DATABASE]`

wait for your Trusted VPC Endpoint to be provisioned

```
USAGE
  $ heroku endpoints:wait [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku endpoints:wait
```

_See code: [src/commands/endpoints/wait.ts](https://github.com/heroku/heroku-endpoints-cli/blob/v0.3.0/src/commands/endpoints/wait.ts)_
<!-- commandsstop -->
