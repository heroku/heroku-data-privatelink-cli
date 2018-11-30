heroku-privatelinks-cli
=======================

Heroku PrivateLinks CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/heroku-privatelinks-cli.svg)](https://npmjs.org/package/heroku-privatelinks-cli)
[![Downloads/week](https://img.shields.io/npm/dw/heroku-privatelinks-cli.svg)](https://npmjs.org/package/heroku-privatelinks-cli)
[![License](https://img.shields.io/npm/l/heroku-privatelinks-cli.svg)](https://github.com/brettgoulder/heroku-privatelinks-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g heroku-privatelinks-cli
$ heroku COMMAND
running command...
$ heroku (-v|--version|version)
heroku-privatelinks-cli/0.0.1 darwin-x64 node-v10.14.0
$ heroku --help [COMMAND]
USAGE
  $ heroku COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`heroku privatelinks [DATABASE]`](#heroku-privatelinks-database)
* [`heroku privatelinks:access [DATABASE]`](#heroku-privatelinksaccess-database)
* [`heroku privatelinks:access:add [DATABASE] [AWS_IDS]`](#heroku-privatelinksaccessadd-database-aws-ids)
* [`heroku privatelinks:access:remove [DATABASE] [AWS_ARN]`](#heroku-privatelinksaccessremove-database-aws-arn)
* [`heroku privatelinks:create [DATABASE] [AWS_IDS]`](#heroku-privatelinkscreate-database-aws-ids)
* [`heroku privatelinks:destroy [DATABASE]`](#heroku-privatelinksdestroy-database)
* [`heroku privatelinks:info [DATABASE]`](#heroku-privatelinksinfo-database)

## `heroku privatelinks [DATABASE]`

lists all your Private Links

```
USAGE
  $ heroku privatelinks [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku privatelinks
```

_See code: [src/commands/privatelinks/index.ts](https://github.com/brettgoulder/heroku-privatelinks-cli/blob/v0.0.1/src/commands/privatelinks/index.ts)_

## `heroku privatelinks:access [DATABASE]`

get information on the status of your Private Link

```
USAGE
  $ heroku privatelinks:access [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLES
  $ heroku privatelinks:access
  $ heroku privatelinks:access postgresql-rigid-37567
```

_See code: [src/commands/privatelinks/access/index.ts](https://github.com/brettgoulder/heroku-privatelinks-cli/blob/v0.0.1/src/commands/privatelinks/access/index.ts)_

## `heroku privatelinks:access:add [DATABASE] [AWS_IDS]`

get information on the status of your Private Link

```
USAGE
  $ heroku privatelinks:access:add [DATABASE] [AWS_IDS]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLES
  $ heroku privatelinks:access:add 123456
  $ heroku privatelinks:access:add 123456,7891011
```

_See code: [src/commands/privatelinks/access/add.ts](https://github.com/brettgoulder/heroku-privatelinks-cli/blob/v0.0.1/src/commands/privatelinks/access/add.ts)_

## `heroku privatelinks:access:remove [DATABASE] [AWS_ARN]`

get information on the status of your Private Link

```
USAGE
  $ heroku privatelinks:access:remove [DATABASE] [AWS_ARN]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku privatelinks:access:remove arn:aws:iam::12345678910:root
```

_See code: [src/commands/privatelinks/access/remove.ts](https://github.com/brettgoulder/heroku-privatelinks-cli/blob/v0.0.1/src/commands/privatelinks/access/remove.ts)_

## `heroku privatelinks:create [DATABASE] [AWS_IDS]`

get information on the status of your Private Link

```
USAGE
  $ heroku privatelinks:create [DATABASE] [AWS_IDS]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku privatelinks:create
```

_See code: [src/commands/privatelinks/create.ts](https://github.com/brettgoulder/heroku-privatelinks-cli/blob/v0.0.1/src/commands/privatelinks/create.ts)_

## `heroku privatelinks:destroy [DATABASE]`

get information on the status of your Private Link

```
USAGE
  $ heroku privatelinks:destroy [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku privatelinks:destroy
```

_See code: [src/commands/privatelinks/destroy.ts](https://github.com/brettgoulder/heroku-privatelinks-cli/blob/v0.0.1/src/commands/privatelinks/destroy.ts)_

## `heroku privatelinks:info [DATABASE]`

get information on the status of your Private Link

```
USAGE
  $ heroku privatelinks:info [DATABASE]

OPTIONS
  -a, --app=app  (required) app to run command against

EXAMPLE
  $ heroku privatelinks
```

_See code: [src/commands/privatelinks/info.ts](https://github.com/brettgoulder/heroku-privatelinks-cli/blob/v0.0.1/src/commands/privatelinks/info.ts)_
<!-- commandsstop -->
