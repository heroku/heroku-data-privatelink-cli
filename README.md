Heroku Postgres via PrivateLink CLI
=======================

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
$ npm install -g @heroku-cli/plugin-data-privatelink
$ heroku COMMAND
running command...
$ heroku (-v|--version|version)
@heroku-cli/plugin-data-privatelink/1.2.0 darwin-x64 node-v10.16.0
$ heroku --help [COMMAND]
USAGE
  $ heroku COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`heroku data:privatelink [DATABASE]`](#heroku-dataprivatelink-database)
* [`heroku data:privatelink:access [DATABASE]`](#heroku-dataprivatelinkaccess-database)
* [`heroku data:privatelink:access:add [DATABASE]`](#heroku-dataprivatelinkaccessadd-database)
* [`heroku data:privatelink:access:remove [DATABASE]`](#heroku-dataprivatelinkaccessremove-database)
* [`heroku data:privatelink:create [DATABASE]`](#heroku-dataprivatelinkcreate-database)
* [`heroku data:privatelink:destroy [DATABASE]`](#heroku-dataprivatelinkdestroy-database)
* [`heroku data:privatelink:wait [DATABASE]`](#heroku-dataprivatelinkwait-database)

## `heroku data:privatelink [DATABASE]`

list all your privatelink endpoints!

```
USAGE
  $ heroku data:privatelink [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

ALIASES
  $ heroku pg:privatelink
  $ heroku kafka:privatelink
  $ heroku redis:privatelink

EXAMPLE
  $ heroku data:privatelink postgresql-sushi-12345
```

_See code: [src/commands/data/privatelink/index.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.2.0/src/commands/data/privatelink/index.ts)_

## `heroku data:privatelink:access [DATABASE]`

list all accounts for your privatelink endpoint's whitelist

```
USAGE
  $ heroku data:privatelink:access [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

ALIASES
  $ heroku pg:privatelink:access
  $ heroku kafka:privatelink:access
  $ heroku redis:privatelink:access

EXAMPLE
  $ heroku data:privatelink:access postgresql-sushi-12345
```

_See code: [src/commands/data/privatelink/access/index.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.2.0/src/commands/data/privatelink/access/index.ts)_

## `heroku data:privatelink:access:add [DATABASE]`

add an account to your privatelink endpoint's whitelist

```
USAGE
  $ heroku data:privatelink:access:add [DATABASE]

OPTIONS
  -a, --app=app                        (required) app to run command against
  -i, --aws-account-id=aws-account-id  AWS account id to use

ALIASES
  $ heroku pg:privatelink:access:add
  $ heroku kafka:privatelink:access:add
  $ heroku redis:privatelink:access:add

EXAMPLES
  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc
  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 
  123456789012:user/xyz
```

_See code: [src/commands/data/privatelink/access/add.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.2.0/src/commands/data/privatelink/access/add.ts)_

## `heroku data:privatelink:access:remove [DATABASE]`

remove an account from your privatelink endpoint's whitelist

```
USAGE
  $ heroku data:privatelink:access:remove [DATABASE]

OPTIONS
  -a, --app=app                        (required) app to run command against
  -i, --aws-account-id=aws-account-id  AWS account id to use

ALIASES
  $ heroku pg:privatelink:access:remove
  $ heroku kafka:privatelink:access:remove
  $ heroku redis:privatelink:access:remove

EXAMPLES
  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/xyz
  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 
  123456789012:user/xyz
```

_See code: [src/commands/data/privatelink/access/remove.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.2.0/src/commands/data/privatelink/access/remove.ts)_

## `heroku data:privatelink:create [DATABASE]`

create a new privatelink endpoint for your database

```
USAGE
  $ heroku data:privatelink:create [DATABASE]

OPTIONS
  -a, --app=app                        (required) app to run command against
  -i, --aws-account-id=aws-account-id  AWS account id to use

ALIASES
  $ heroku pg:privatelink:create
  $ heroku kafka:privatelink:create
  $ heroku redis:privatelink:create

EXAMPLES
  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc
  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --account-id 
  123456789012:user/xyz
```

_See code: [src/commands/data/privatelink/create.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.2.0/src/commands/data/privatelink/create.ts)_

## `heroku data:privatelink:destroy [DATABASE]`

destroy a privatelink endpoint for your database

```
USAGE
  $ heroku data:privatelink:destroy [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

ALIASES
  $ heroku pg:privatelink:destroy
  $ heroku kafka:privatelink:destroy
  $ heroku redis:privatelink:destroy

EXAMPLE
  $ heroku data:privatelink:destroy postgresql-sushi-12345
```

_See code: [src/commands/data/privatelink/destroy.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.2.0/src/commands/data/privatelink/destroy.ts)_

## `heroku data:privatelink:wait [DATABASE]`

wait for your privatelink endpoint to be provisioned

```
USAGE
  $ heroku data:privatelink:wait [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

ALIASES
  $ heroku pg:privatelink:wait
  $ heroku kafka:privatelink:wait
  $ heroku redis:privatelink:wait

EXAMPLE
  $ heroku data:privatelink:wait postgresql-sushi-12345
```

_See code: [src/commands/data/privatelink/wait.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.2.0/src/commands/data/privatelink/wait.ts)_
<!-- commandsstop -->
