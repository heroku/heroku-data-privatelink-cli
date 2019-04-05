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
$ npm install -g @heroku-cli/plugin-pg-privatelink
$ heroku COMMAND
running command...
$ heroku (-v|--version|version)
@heroku-cli/plugin-pg-privatelink/0.8.0 darwin-x64 node-v10.15.1
$ heroku --help [COMMAND]
USAGE
  $ heroku COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`heroku pg:privatelink [DATABASE]`](#heroku-pgprivatelink-database)
* [`heroku pg:privatelink:access [DATABASE]`](#heroku-pgprivatelinkaccess-database)
* [`heroku pg:privatelink:access:add [DATABASE]`](#heroku-pgprivatelinkaccessadd-database)
* [`heroku pg:privatelink:access:remove [DATABASE]`](#heroku-pgprivatelinkaccessremove-database)
* [`heroku pg:privatelink:create [DATABASE]`](#heroku-pgprivatelinkcreate-database)
* [`heroku pg:privatelink:destroy [DATABASE]`](#heroku-pgprivatelinkdestroy-database)
* [`heroku pg:privatelink:wait [DATABASE]`](#heroku-pgprivatelinkwait-database)

## `heroku pg:privatelink [DATABASE]`

list all your privatelink endpoints!

```
USAGE
  $ heroku pg:privatelink [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku pg:privatelink postgresql-sushi-12345
```

_See code: [src/commands/pg/privatelink/index.ts](https://github.com/heroku/heroku-pg-privatelink-cli/blob/v0.8.0/src/commands/pg/privatelink/index.ts)_

## `heroku pg:privatelink:access [DATABASE]`

list all accounts for your privatelink endpoint's whitelist

```
USAGE
  $ heroku pg:privatelink:access [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku pg:privatelink:access postgresql-sushi-12345
```

_See code: [src/commands/pg/privatelink/access/index.ts](https://github.com/heroku/heroku-pg-privatelink-cli/blob/v0.8.0/src/commands/pg/privatelink/access/index.ts)_

## `heroku pg:privatelink:access:add [DATABASE]`

add an account to your privatelink endpoint's whitelist

```
USAGE
  $ heroku pg:privatelink:access:add [DATABASE]

OPTIONS
  -a, --app=app                        (required) app to run command against
  -i, --aws-account-id=aws-account-id  AWS account id to use

EXAMPLES
  $ heroku pg:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc
  $ heroku pg:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 
  123456789012:user/xyz
```

_See code: [src/commands/pg/privatelink/access/add.ts](https://github.com/heroku/heroku-pg-privatelink-cli/blob/v0.8.0/src/commands/pg/privatelink/access/add.ts)_

## `heroku pg:privatelink:access:remove [DATABASE]`

remove an account from your privatelink endpoint's whitelist

```
USAGE
  $ heroku pg:privatelink:access:remove [DATABASE]

OPTIONS
  -a, --app=app                        (required) app to run command against
  -i, --aws-account-id=aws-account-id  AWS account id to use

EXAMPLES
  $ heroku pg:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/xyz
  $ heroku pg:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 
  123456789012:user/xyz
```

_See code: [src/commands/pg/privatelink/access/remove.ts](https://github.com/heroku/heroku-pg-privatelink-cli/blob/v0.8.0/src/commands/pg/privatelink/access/remove.ts)_

## `heroku pg:privatelink:create [DATABASE]`

create a new privatelink endpoint for your database

```
USAGE
  $ heroku pg:privatelink:create [DATABASE]

OPTIONS
  -a, --app=app                        (required) app to run command against
  -i, --aws-account-id=aws-account-id  AWS account id to use

EXAMPLES
  $ heroku pg:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc
  $ heroku pg:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --account-id 
  123456789012:user/xyz
```

_See code: [src/commands/pg/privatelink/create.ts](https://github.com/heroku/heroku-pg-privatelink-cli/blob/v0.8.0/src/commands/pg/privatelink/create.ts)_

## `heroku pg:privatelink:destroy [DATABASE]`

destroy a privatelink endpoint for your database

```
USAGE
  $ heroku pg:privatelink:destroy [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku pg:privatelink:destroy postgresql-sushi-12345
```

_See code: [src/commands/pg/privatelink/destroy.ts](https://github.com/heroku/heroku-pg-privatelink-cli/blob/v0.8.0/src/commands/pg/privatelink/destroy.ts)_

## `heroku pg:privatelink:wait [DATABASE]`

wait for your privatelink endpoint to be provisioned

```
USAGE
  $ heroku pg:privatelink:wait [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku pg:privatelink:wait postgresql-sushi-12345
```

_See code: [src/commands/pg/privatelink/wait.ts](https://github.com/heroku/heroku-pg-privatelink-cli/blob/v0.8.0/src/commands/pg/privatelink/wait.ts)_
<!-- commandsstop -->
