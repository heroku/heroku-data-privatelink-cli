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
@heroku-cli/plugin-trusted-endpoints/0.1.0 darwin-x64 node-v10.14.0
$ heroku --help [COMMAND]
USAGE
  $ heroku COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`heroku endpoints [DATABASE]`](#heroku-endpoints-database)
* [`heroku endpoints:access DATABASE`](#heroku-endpointsaccess-database)
* [`heroku endpoints:access:add DATABASE ACCOUNT_IDS`](#heroku-endpointsaccessadd-database-account-ids)
* [`heroku endpoints:access:remove DATABASE ACCOUNT_IDS`](#heroku-endpointsaccessremove-database-account-ids)
* [`heroku endpoints:create DATABASE ACCOUNT_IDS`](#heroku-endpointscreate-database-account-ids)
* [`heroku endpoints:destroy DATABASE`](#heroku-endpointsdestroy-database)

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

_See code: [src/commands/endpoints/index.ts](https://github.com/heroku/heroku-endpoints-cli/blob/v0.1.0/src/commands/endpoints/index.ts)_

## `heroku endpoints:access DATABASE`

list all accounts for your Trusted VPC Endpoint's whitelist

```
USAGE
  $ heroku endpoints:access DATABASE

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku endpoints:access postgresql-rigid-37567
```

_See code: [src/commands/endpoints/access/index.ts](https://github.com/heroku/heroku-endpoints-cli/blob/v0.1.0/src/commands/endpoints/access/index.ts)_

## `heroku endpoints:access:add DATABASE ACCOUNT_IDS`

add an account to your Trusted VPC Endpoints's whitelist

```
USAGE
  $ heroku endpoints:access:add DATABASE ACCOUNT_IDS

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLES
  $ heroku endpoints:access:add postgresql-rigid-37567 123456
  $ heroku endpoints:access:add postgresql-rigid-37567 123456,7891011
```

_See code: [src/commands/endpoints/access/add.ts](https://github.com/heroku/heroku-endpoints-cli/blob/v0.1.0/src/commands/endpoints/access/add.ts)_

## `heroku endpoints:access:remove DATABASE ACCOUNT_IDS`

remove an account from your Trusted VPC Endpoint's whitelist

```
USAGE
  $ heroku endpoints:access:remove DATABASE ACCOUNT_IDS

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku endpoints:access:remove arn:aws:iam::12345678910:root
```

_See code: [src/commands/endpoints/access/remove.ts](https://github.com/heroku/heroku-endpoints-cli/blob/v0.1.0/src/commands/endpoints/access/remove.ts)_

## `heroku endpoints:create DATABASE ACCOUNT_IDS`

create a new Trusted VPC Endpoint for your database

```
USAGE
  $ heroku endpoints:create DATABASE ACCOUNT_IDS

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku endpoints:create
```

_See code: [src/commands/endpoints/create.ts](https://github.com/heroku/heroku-endpoints-cli/blob/v0.1.0/src/commands/endpoints/create.ts)_

## `heroku endpoints:destroy DATABASE`

destroy a Trusted VPC Endpoint for your database

```
USAGE
  $ heroku endpoints:destroy DATABASE

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku endpoints:destroy
```

_See code: [src/commands/endpoints/destroy.ts](https://github.com/heroku/heroku-endpoints-cli/blob/v0.1.0/src/commands/endpoints/destroy.ts)_
<!-- commandsstop -->
