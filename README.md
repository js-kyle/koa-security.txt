# koa-security.txt [![Codeship Status for js-kyle/koa-security.txt](https://app.codeship.com/projects/1373e220-a3a0-0137-b7c8-4ea2a4269e5c/status?branch=master)](https://app.codeship.com/projects/360341)


> The main purpose of security.txt is to help make things easier for companies and security researchers when trying to secure platforms. Thanks to security.txt, security researchers can easily get in touch with companies about security issues.

## Install

```
$ npm install koa-security.txt
```


## Usage in Koa application

```js
const securitytxt = require('koa-security.txt');
const options = {
  contact: 'security@example.com',
  encryption: 'https://example.com/public-key.asc'
};

app.use(securitytxt(options));
```


## API

### securitytxt(options?)

#### options

Type: `object`

#### contact

Type: `string`
Default: `rainbows`

E-mail address for people to contact you about security issues

#### encryption

Type: `string`

A link to a key which security researchers should use to securely talk to you. Remember to include "https://"

##### acknowledgments

Type: `string`

A link to a web page where you say thank you to security researchers who have helped you. Remember to include "https://".

##### languages

Type: `Array`
Default: `['en']`

A comma-separated list of Preferred-Language codes that your security team speaks. You may include more than one language.

#### canonical

Type: `string`

The most common URL for accessing your security.txt file.

#### policy

Type: `string`

A link to a policy detailing what security researchers should do when searching for or reporting security issues. Remember to include "https://".

#### hiring

Type: `string`

A link to any security-related job openings in your organisation. Remember to include "https://".