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
@heroku-cli/plugin-data-privatelink/1.3.2 darwin-x64 node-v16.20.2
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
* [`heroku kafka:privatelink DATABASE`](#heroku-kafkaprivatelink-database)
* [`heroku kafka:privatelink:access DATABASE`](#heroku-kafkaprivatelinkaccess-database)
* [`heroku kafka:privatelink:access:add DATABASE`](#heroku-kafkaprivatelinkaccessadd-database)
* [`heroku kafka:privatelink:access:remove DATABASE`](#heroku-kafkaprivatelinkaccessremove-database)
* [`heroku kafka:privatelink:create DATABASE`](#heroku-kafkaprivatelinkcreate-database)
* [`heroku kafka:privatelink:destroy DATABASE`](#heroku-kafkaprivatelinkdestroy-database)
* [`heroku kafka:privatelink:wait DATABASE`](#heroku-kafkaprivatelinkwait-database)
* [`heroku pg:privatelink DATABASE`](#heroku-pgprivatelink-database)
* [`heroku pg:privatelink:access DATABASE`](#heroku-pgprivatelinkaccess-database)
* [`heroku pg:privatelink:access:add DATABASE`](#heroku-pgprivatelinkaccessadd-database)
* [`heroku pg:privatelink:access:remove DATABASE`](#heroku-pgprivatelinkaccessremove-database)
* [`heroku pg:privatelink:create DATABASE`](#heroku-pgprivatelinkcreate-database)
* [`heroku pg:privatelink:destroy DATABASE`](#heroku-pgprivatelinkdestroy-database)
* [`heroku pg:privatelink:wait DATABASE`](#heroku-pgprivatelinkwait-database)
* [`heroku redis:privatelink DATABASE`](#heroku-redisprivatelink-database)
* [`heroku redis:privatelink:access DATABASE`](#heroku-redisprivatelinkaccess-database)
* [`heroku redis:privatelink:access:add DATABASE`](#heroku-redisprivatelinkaccessadd-database)
* [`heroku redis:privatelink:access:remove DATABASE`](#heroku-redisprivatelinkaccessremove-database)
* [`heroku redis:privatelink:create DATABASE`](#heroku-redisprivatelinkcreate-database)
* [`heroku redis:privatelink:destroy DATABASE`](#heroku-redisprivatelinkdestroy-database)
* [`heroku redis:privatelink:wait DATABASE`](#heroku-redisprivatelinkwait-database)

## `heroku data:privatelink DATABASE`

list all your privatelink endpoints

```
USAGE
  $ heroku data:privatelink DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  list all your privatelink endpoints

EXAMPLES
  $ heroku data:privatelink postgresql-sushi-12345 --app my-app
```

_See code: [src/commands/data/privatelink/index.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.2/src/commands/data/privatelink/index.ts)_

## `heroku data:privatelink:access DATABASE`

list all allowed accounts for your privatelink endpoint

```
USAGE
  $ heroku data:privatelink:access DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  list all allowed accounts for your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access postgresql-sushi-12345 --app my-app
```

_See code: [src/commands/data/privatelink/access/index.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.2/src/commands/data/privatelink/access/index.ts)_

## `heroku data:privatelink:access:add DATABASE`

add one or more allowed AWS accounts to your privatelink endpoint

```
USAGE
  $ heroku data:privatelink:access:add DATABASE -i <value> -a <value> [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

DESCRIPTION
  add one or more allowed AWS accounts to your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --app my-app

  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app
```

_See code: [src/commands/data/privatelink/access/add.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.2/src/commands/data/privatelink/access/add.ts)_

## `heroku data:privatelink:access:remove DATABASE`

remove an allowed account from your privatelink endpoint

```
USAGE
  $ heroku data:privatelink:access:remove DATABASE -i <value> -a <value> [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

DESCRIPTION
  remove an allowed account from your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/xyz --app my-app

  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app
```

_See code: [src/commands/data/privatelink/access/remove.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.2/src/commands/data/privatelink/access/remove.ts)_

## `heroku data:privatelink:create DATABASE`

create a new privatelink endpoint for your database

```
USAGE
  $ heroku data:privatelink:create DATABASE -i <value> -a <value> [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

DESCRIPTION
  create a new privatelink endpoint for your database

EXAMPLES
  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --app my-app

  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --account-id 123456789012:user/xyz --app my-app
```

_See code: [src/commands/data/privatelink/create.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.2/src/commands/data/privatelink/create.ts)_

## `heroku data:privatelink:destroy DATABASE`

destroy a privatelink endpoint for your database

```
USAGE
  $ heroku data:privatelink:destroy DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  destroy a privatelink endpoint for your database

EXAMPLES
  $ heroku data:privatelink:destroy postgresql-sushi-12345 --app my-app
```

_See code: [src/commands/data/privatelink/destroy.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.2/src/commands/data/privatelink/destroy.ts)_

## `heroku data:privatelink:wait DATABASE`

wait for your privatelink endpoint to be provisioned

```
USAGE
  $ heroku data:privatelink:wait DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  wait for your privatelink endpoint to be provisioned

EXAMPLES
  $ heroku data:privatelink:wait postgresql-sushi-12345 postgresql-sushi-12345 --app my-app
```

_See code: [src/commands/data/privatelink/wait.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/v1.3.2/src/commands/data/privatelink/wait.ts)_

## `heroku help [COMMANDS]`

Display help for heroku.

```
USAGE
  $ heroku help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for heroku.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.20/src/commands/help.ts)_

## `heroku kafka:privatelink DATABASE`

list all your privatelink endpoints

```
USAGE
  $ heroku kafka:privatelink DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  list all your privatelink endpoints

EXAMPLES
  $ heroku data:privatelink postgresql-sushi-12345 --app my-app
```

## `heroku kafka:privatelink:access DATABASE`

list all allowed accounts for your privatelink endpoint

```
USAGE
  $ heroku kafka:privatelink:access DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  list all allowed accounts for your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access postgresql-sushi-12345 --app my-app
```

## `heroku kafka:privatelink:access:add DATABASE`

add one or more allowed AWS accounts to your privatelink endpoint

```
USAGE
  $ heroku kafka:privatelink:access:add DATABASE -i <value> -a <value> [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

DESCRIPTION
  add one or more allowed AWS accounts to your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --app my-app

  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app
```

## `heroku kafka:privatelink:access:remove DATABASE`

remove an allowed account from your privatelink endpoint

```
USAGE
  $ heroku kafka:privatelink:access:remove DATABASE -i <value> -a <value> [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

DESCRIPTION
  remove an allowed account from your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/xyz --app my-app

  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app
```

## `heroku kafka:privatelink:create DATABASE`

create a new privatelink endpoint for your database

```
USAGE
  $ heroku kafka:privatelink:create DATABASE -i <value> -a <value> [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

DESCRIPTION
  create a new privatelink endpoint for your database

EXAMPLES
  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --app my-app

  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --account-id 123456789012:user/xyz --app my-app
```

## `heroku kafka:privatelink:destroy DATABASE`

destroy a privatelink endpoint for your database

```
USAGE
  $ heroku kafka:privatelink:destroy DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  destroy a privatelink endpoint for your database

EXAMPLES
  $ heroku data:privatelink:destroy postgresql-sushi-12345 --app my-app
```

## `heroku kafka:privatelink:wait DATABASE`

wait for your privatelink endpoint to be provisioned

```
USAGE
  $ heroku kafka:privatelink:wait DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  wait for your privatelink endpoint to be provisioned

EXAMPLES
  $ heroku data:privatelink:wait postgresql-sushi-12345 postgresql-sushi-12345 --app my-app
```

## `heroku pg:privatelink DATABASE`

list all your privatelink endpoints

```
USAGE
  $ heroku pg:privatelink DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  list all your privatelink endpoints

EXAMPLES
  $ heroku data:privatelink postgresql-sushi-12345 --app my-app
```

## `heroku pg:privatelink:access DATABASE`

list all allowed accounts for your privatelink endpoint

```
USAGE
  $ heroku pg:privatelink:access DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  list all allowed accounts for your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access postgresql-sushi-12345 --app my-app
```

## `heroku pg:privatelink:access:add DATABASE`

add one or more allowed AWS accounts to your privatelink endpoint

```
USAGE
  $ heroku pg:privatelink:access:add DATABASE -i <value> -a <value> [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

DESCRIPTION
  add one or more allowed AWS accounts to your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --app my-app

  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app
```

## `heroku pg:privatelink:access:remove DATABASE`

remove an allowed account from your privatelink endpoint

```
USAGE
  $ heroku pg:privatelink:access:remove DATABASE -i <value> -a <value> [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

DESCRIPTION
  remove an allowed account from your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/xyz --app my-app

  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app
```

## `heroku pg:privatelink:create DATABASE`

create a new privatelink endpoint for your database

```
USAGE
  $ heroku pg:privatelink:create DATABASE -i <value> -a <value> [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

DESCRIPTION
  create a new privatelink endpoint for your database

EXAMPLES
  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --app my-app

  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --account-id 123456789012:user/xyz --app my-app
```

## `heroku pg:privatelink:destroy DATABASE`

destroy a privatelink endpoint for your database

```
USAGE
  $ heroku pg:privatelink:destroy DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  destroy a privatelink endpoint for your database

EXAMPLES
  $ heroku data:privatelink:destroy postgresql-sushi-12345 --app my-app
```

## `heroku pg:privatelink:wait DATABASE`

wait for your privatelink endpoint to be provisioned

```
USAGE
  $ heroku pg:privatelink:wait DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  wait for your privatelink endpoint to be provisioned

EXAMPLES
  $ heroku data:privatelink:wait postgresql-sushi-12345 postgresql-sushi-12345 --app my-app
```

## `heroku redis:privatelink DATABASE`

list all your privatelink endpoints

```
USAGE
  $ heroku redis:privatelink DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  list all your privatelink endpoints

EXAMPLES
  $ heroku data:privatelink postgresql-sushi-12345 --app my-app
```

## `heroku redis:privatelink:access DATABASE`

list all allowed accounts for your privatelink endpoint

```
USAGE
  $ heroku redis:privatelink:access DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  list all allowed accounts for your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access postgresql-sushi-12345 --app my-app
```

## `heroku redis:privatelink:access:add DATABASE`

add one or more allowed AWS accounts to your privatelink endpoint

```
USAGE
  $ heroku redis:privatelink:access:add DATABASE -i <value> -a <value> [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

DESCRIPTION
  add one or more allowed AWS accounts to your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --app my-app

  $ heroku data:privatelink:access:add postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app
```

## `heroku redis:privatelink:access:remove DATABASE`

remove an allowed account from your privatelink endpoint

```
USAGE
  $ heroku redis:privatelink:access:remove DATABASE -i <value> -a <value> [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

DESCRIPTION
  remove an allowed account from your privatelink endpoint

EXAMPLES
  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/xyz --app my-app

  $ heroku data:privatelink:access:remove postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --aws-account-id 123456789012:user/xyz --app my-app
```

## `heroku redis:privatelink:create DATABASE`

create a new privatelink endpoint for your database

```
USAGE
  $ heroku redis:privatelink:create DATABASE -i <value> -a <value> [-r <value>]

FLAGS
  -a, --app=<value>                (required) app to run command against
  -i, --aws-account-id=<value>...  (required) AWS account id to use
  -r, --remote=<value>             git remote of app to use

DESCRIPTION
  create a new privatelink endpoint for your database

EXAMPLES
  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --app my-app

  $ heroku data:privatelink:create postgresql-sushi-12345 --aws-account-id 123456789012:user/abc --account-id 123456789012:user/xyz --app my-app
```

## `heroku redis:privatelink:destroy DATABASE`

destroy a privatelink endpoint for your database

```
USAGE
  $ heroku redis:privatelink:destroy DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  destroy a privatelink endpoint for your database

EXAMPLES
  $ heroku data:privatelink:destroy postgresql-sushi-12345 --app my-app
```

## `heroku redis:privatelink:wait DATABASE`

wait for your privatelink endpoint to be provisioned

```
USAGE
  $ heroku redis:privatelink:wait DATABASE -a <value> [-r <value>]

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  wait for your privatelink endpoint to be provisioned

EXAMPLES
  $ heroku data:privatelink:wait postgresql-sushi-12345 postgresql-sushi-12345 --app my-app
```
<!-- commandsstop -->
