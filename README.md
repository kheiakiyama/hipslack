# HipSlack

HipSlack is HipChat Client, it has ui like slack.

## Install

set config.json

```config.json
{
	key: '{API_KEY}'
}
```

### What is API_KEY ?

`API_KEY` is [personal token](https://www.hipchat.com/docs/apiv2/auth).

### Where is config.json ?
#### Windows
%APPDATA%/hipslack/config.json

#### OS X
~/Library/Application Support/hipslack/config.json


## Build 

- Run `gulp package`

## development

- Run `gulp serve` for preview.
- Run `gulp lint` for check code styles.
