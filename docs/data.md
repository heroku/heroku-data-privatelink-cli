`heroku data`
=============

list all your privatelink endpoints

* [`heroku data:privatelink DATABASE`](#heroku-dataprivatelink-database)
* [`heroku data:privatelink:access DATABASE`](#heroku-dataprivatelinkaccess-database)
* [`heroku data:privatelink:access:add DATABASE`](#heroku-dataprivatelinkaccessadd-database)
* [`heroku data:privatelink:access:remove DATABASE`](#heroku-dataprivatelinkaccessremove-database)
* [`heroku data:privatelink:create DATABASE`](#heroku-dataprivatelinkcreate-database)
* [`heroku data:privatelink:destroy DATABASE`](#heroku-dataprivatelinkdestroy-database)
* [`heroku data:privatelink:wait DATABASE`](#heroku-dataprivatelinkwait-database)

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

_See code: [src/commands/data/privatelink/index.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/plugin-data-privatelink-v2.0.3/src/commands/data/privatelink/index.ts)_

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

_See code: [src/commands/data/privatelink/access/index.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/plugin-data-privatelink-v2.0.3/src/commands/data/privatelink/access/index.ts)_

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

_See code: [src/commands/data/privatelink/access/add.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/plugin-data-privatelink-v2.0.3/src/commands/data/privatelink/access/add.ts)_

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

_See code: [src/commands/data/privatelink/access/remove.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/plugin-data-privatelink-v2.0.3/src/commands/data/privatelink/access/remove.ts)_

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

_See code: [src/commands/data/privatelink/create.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/plugin-data-privatelink-v2.0.3/src/commands/data/privatelink/create.ts)_

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

_See code: [src/commands/data/privatelink/destroy.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/plugin-data-privatelink-v2.0.3/src/commands/data/privatelink/destroy.ts)_

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

_See code: [src/commands/data/privatelink/wait.ts](https://github.com/heroku/heroku-data-privatelink-cli/blob/plugin-data-privatelink-v2.0.3/src/commands/data/privatelink/wait.ts)_
