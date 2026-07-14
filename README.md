Heroku Data via PrivateLink CLI
=======================

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@heroku-cli/plugin-data-privatelink.svg)](https://www.npmjs.com/package/@heroku-cli/plugin-data-privatelink)
[![Downloads/week](https://img.shields.io/npm/dw/@heroku-cli/plugin-data-privatelink.svg)](https://www.npmjs.com/package/@heroku-cli/plugin-data-privatelink)
[![License](https://img.shields.io/npm/l/@heroku-cli/plugin-data-privatelink.svg)](https://github.com/heroku/heroku-data-privatelink-cli/blob/main/package.json)

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
$ heroku (--version)
@heroku-cli/plugin-data-privatelink/1.3.4 darwin-arm64 node-v22.22.2
$ heroku --help [COMMAND]
USAGE
  $ heroku COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`heroku data:privatelink DATABASE`](#heroku-dataprivatelink-database)
* [`heroku data:privatelink:access DATABASE`](#heroku-dataprivatelinkaccess-database)
* [`heroku data:privatelink:access:add DATABASE`](#heroku-dataprivatelinkaccessadd-database)
* [`heroku data:privatelink:access:remove DATABASE`](#heroku-dataprivatelinkaccessremove-database)
* [`heroku data:privatelink:create DATABASE`](#heroku-dataprivatelinkcreate-database)
* [`heroku data:privatelink:destroy DATABASE`](#heroku-dataprivatelinkdestroy-database)
* [`heroku data:privatelink:wait DATABASE`](#heroku-dataprivatelinkwait-database)
* [`heroku help [COMMANDS]`](#heroku-help-commands)

## `heroku data:privatelink DATABASE`

list all your privatelink endpoints

```
USAGE
  $ heroku data:privatelink DATABASE -a <value> [--prompt] [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

GLOBAL FLAGS
  --prompt  interactively prompt for command arguments and flags

DESCRIPTION
  list all your privatelink endpoints

EXAMPLES
  $ heroku data:privatelink postgresql-sushi-12345 --app my-app
```

_See code: [src/commands/data/privatelink/index.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.4/src/commands/data/privatelink/index.ts)_

## `heroku data:privatelink:access DATABASE`

list all allowed accounts for your privatelink endpoint

```
USAGE
  $ heroku data:privatelink:access DATABASE -a <value> [--prompt] [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

GLOBAL FLAGS
  --prompt  interactively prompt for command arguments and flags

DESCRIPTION
  list all allowed accounts for your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access postgresql-sushi-12345 --app my-app
```

_See code: [src/commands/data/privatelink/access/index.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.4/src/commands/data/privatelink/access/index.ts)_

## `heroku data:privatelink:access:add DATABASE`

add one or more allowed AWS accounts to your privatelink endpoint

```
USAGE
  $ heroku data:privatelink:access:add DATABASE -a <value> -i <value>... [--prompt] [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

GLOBAL FLAGS
  --prompt  interactively prompt for command arguments and flags

DESCRIPTION
  add one or more allowed AWS accounts to your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --app my-app

  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app
```

_See code: [src/commands/data/privatelink/access/add.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.4/src/commands/data/privatelink/access/add.ts)_

## `heroku data:privatelink:access:remove DATABASE`

remove an allowed account from your privatelink endpoint

```
USAGE
  $ heroku data:privatelink:access:remove DATABASE -a <value> -i <value>... [--prompt] [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

GLOBAL FLAGS
  --prompt  interactively prompt for command arguments and flags

DESCRIPTION
  remove an allowed account from your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/xyz --app my-app

  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app
```

_See code: [src/commands/data/privatelink/access/remove.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.4/src/commands/data/privatelink/access/remove.ts)_

## `heroku data:privatelink:create DATABASE`

create a new privatelink endpoint for your database

```
USAGE
  $ heroku data:privatelink:create DATABASE -a <value> -i <value>... [--prompt] [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

GLOBAL FLAGS
  --prompt  interactively prompt for command arguments and flags

DESCRIPTION
  create a new privatelink endpoint for your database

EXAMPLES
  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --app my-app

  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app
```

_See code: [src/commands/data/privatelink/create.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.4/src/commands/data/privatelink/create.ts)_

## `heroku data:privatelink:destroy DATABASE`

destroy a privatelink endpoint for your database

```
USAGE
  $ heroku data:privatelink:destroy DATABASE -a <value> [--prompt] [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

GLOBAL FLAGS
  --prompt  interactively prompt for command arguments and flags

DESCRIPTION
  destroy a privatelink endpoint for your database

EXAMPLES
  $ heroku data:privatelink:destroy postgresql-sushi-12345 --app my-app
```

_See code: [src/commands/data/privatelink/destroy.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.4/src/commands/data/privatelink/destroy.ts)_

## `heroku data:privatelink:wait DATABASE`

wait for your privatelink endpoint to be provisioned

```
USAGE
  $ heroku data:privatelink:wait DATABASE -a <value> [--prompt] [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

GLOBAL FLAGS
  --prompt  interactively prompt for command arguments and flags

DESCRIPTION
  wait for your privatelink endpoint to be provisioned

EXAMPLES
  $ heroku data:privatelink:wait postgresql-sushi-12345 --app my-app
```

_See code: [src/commands/data/privatelink/wait.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.4/src/commands/data/privatelink/wait.ts)_

## `heroku help [COMMANDS]`

Display help for heroku.

```
USAGE
  $ heroku help [COMMANDS...] [-n]

ARGUMENTS
  [COMMANDS...]  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for heroku.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.20/src/commands/help.ts)_
<!-- commandsstop -->
