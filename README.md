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
@heroku-cli/plugin-data-privatelink/1.0.0 darwin-x64 node-v10.15.1
$ heroku --help [COMMAND]
USAGE
  $ heroku COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`heroku data:privatelink [ADDON]`](#heroku-dataprivatelink-addon)
* [`heroku data:privatelink:access [ADDON]`](#heroku-dataprivatelinkaccess-addon)
* [`heroku data:privatelink:access:add [ADDON]`](#heroku-dataprivatelinkaccessadd-addon)
* [`heroku data:privatelink:access:remove [ADDON]`](#heroku-dataprivatelinkaccessremove-addon)
* [`heroku data:privatelink:create [ADDON]`](#heroku-dataprivatelinkcreate-addon)
* [`heroku data:privatelink:destroy [ADDON]`](#heroku-dataprivatelinkdestroy-addon)
* [`heroku data:privatelink:wait [ADDON]`](#heroku-dataprivatelinkwait-addon)

## `heroku data:privatelink [ADDON]`

list all your privatelink endpoints!

```
USAGE
  $ heroku data:privatelink [ADDON]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku data:privatelink postgresql-sushi-12345
```

_See code: [src/commands/data/privatelink/index.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.0.0/src/commands/data/privatelink/index.ts)_

## `heroku data:privatelink:access [ADDON]`

list all accounts for your privatelink endpoint's whitelist

```
USAGE
  $ heroku data:privatelink:access [ADDON]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku data:privatelink:access postgresql-sushi-12345
```

_See code: [src/commands/data/privatelink/access/index.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.0.0/src/commands/data/privatelink/access/index.ts)_

## `heroku data:privatelink:access:add [ADDON]`

add an account to your privatelink endpoint's whitelist

```
USAGE
  $ heroku data:privatelink:access:add [ADDON]

OPTIONS
  -a, --app=app                        (required) app to run command against
  -i, --aws-account-id=aws-account-id  AWS account id to use

EXAMPLES
  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc
  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 
  123456789012:user/xyz
```

_See code: [src/commands/data/privatelink/access/add.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.0.0/src/commands/data/privatelink/access/add.ts)_

## `heroku data:privatelink:access:remove [ADDON]`

remove an account from your privatelink endpoint's whitelist

```
USAGE
  $ heroku data:privatelink:access:remove [ADDON]

OPTIONS
  -a, --app=app                        (required) app to run command against
  -i, --aws-account-id=aws-account-id  AWS account id to use

EXAMPLES
  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/xyz
  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 
  123456789012:user/xyz
```

_See code: [src/commands/data/privatelink/access/remove.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.0.0/src/commands/data/privatelink/access/remove.ts)_

## `heroku data:privatelink:create [ADDON]`

create a new privatelink endpoint for your database

```
USAGE
  $ heroku data:privatelink:create [ADDON]

OPTIONS
  -a, --app=app                        (required) app to run command against
  -i, --aws-account-id=aws-account-id  AWS account id to use

EXAMPLES
  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc
  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --account-id 
  123456789012:user/xyz
```

_See code: [src/commands/data/privatelink/create.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.0.0/src/commands/data/privatelink/create.ts)_

## `heroku data:privatelink:destroy [ADDON]`

destroy a privatelink endpoint for your database

```
USAGE
  $ heroku data:privatelink:destroy [ADDON]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku data:privatelink:destroy postgresql-sushi-12345
```

_See code: [src/commands/data/privatelink/destroy.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.0.0/src/commands/data/privatelink/destroy.ts)_

## `heroku data:privatelink:wait [ADDON]`

wait for your privatelink endpoint to be provisioned

```
USAGE
  $ heroku data:privatelink:wait [ADDON]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku data:privatelink:wait postgresql-sushi-12345
```

_See code: [src/commands/data/privatelink/wait.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.0.0/src/commands/data/privatelink/wait.ts)_
<!-- commandsstop -->
