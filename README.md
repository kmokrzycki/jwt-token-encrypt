# jwt-token-encrypt

[![Known Vulnerabilities](https://snyk.io/test/github/kmokrzycki/jwt-token-encrypt/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kmokrzycki/jwt-token-encrypt?targetFile=package.json)

This module allows you to generate JSON Web-Tokens with some elements of the data encrypted and read it in a very simple way, without worry too much about encryption.

## Install
```javascript
npm install 'jwt-token-encrypt' --save
```

## Usage
```javascript
import * as jwtEncrypt from 'jwt-token-encrypt';
```
<span style="color:red"> Above is a breaking change as before import was done with defaultExport !

<span style="color:red">Version  < "1.0.3"

## Creating JWT

```javascript
// Data that will be publicly available
const publicData = {
    role: "user"
};

// Data that will only be available to users who know encryption details.
const privateData = {
    email: "user",
    bank: "HSBC",
    pin: "1234",
};

// Encryption settings
const encryption = {
    key: 'AAAAAAAAAAAAAA',
    algorithm: 'aes-256-cbc',
  };

// JWT Settings
const jwtDetails = {
    secret: '1234567890', // to sign the token
    // Default values that will be automatically applied unless specified.
    // algorithm: 'HS256',
    // expiresIn: '12h',
    // notBefore: '0s',
    // Other optional values
    key: 'ThisIsMyAppISS',// is used as ISS but can be named iss too
};

const token = await jwtEncrypt.generateJWT(
      jwtDetails,
      publicData,
      encryption,
      privateData
    );
```

## Reading JWT

``` javascript
// Encryption settings
const encryption = {
    key: 'AAAAAAAAAAAAAA',
    algorithm: 'aes-256-cbc',
  };

const decrypted = jwtEncrypt.readJWT(token, encryption);

 ```


## Token Content

E.g.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJOS0luVldoQjFyVkxDd3hsdE1OdWlVQzZoOVV1ZEFiaSIsImRhdGEiOnsicHVibGljIjp7ImRhdGExIjoxLCJkYXRhMiI6MiwiZGF0YTMiOjN9LCJlbmNEYXRhIjoiYjliM2QyNDdkNTk4ZTlkODczOTM2NTI4MWVmN2ExZTkifSwiaWF0IjoxNTExMTk5MDg0LCJleHAiOjE1MTEyNDIyODR9.KzfcIY95RR7aPYKn5EcXZYvETDCGZIJ91p7IfXCiClw
```

Once decoded will hold below content [jwt.io](https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJOS0luVldoQjFyVkxDd3hsdE1OdWlVQzZoOVV1ZEFiaSIsImRhdGEiOnsicHVibGljIjp7ImRhdGExIjoxLCJkYXRhMiI6MiwiZGF0YTMiOjN9LCJlbmNEYXRhIjoiYjliM2QyNDdkNTk4ZTlkODczOTM2NTI4MWVmN2ExZTkifSwiaWF0IjoxNTExMTk5MDg0LCJleHAiOjE1MTEyNDIyODR9.KzfcIY95RR7aPYKn5EcXZYvETDCGZIJ91p7IfXCiClw)

``` javascript
{
    iss: 'NKInVWhB1rVLCwxltMNuiUC6h9UudAbi',
    data: {
      public: {
            data1: 1,
            data2: 2,
            data3: 3
        },
      encData: '5fb8ed70a3864cbd97b25cc8ca2c0bc7',
    },
  },

 ```

 As you can see private data:

 ``` javascript
 privateData = {
    email: "user",
    bank: "HSBC",
    pin: "1234",
}

```
is got encripted and respresented with:

``` javascript
{
    ....
    encData: '5fb8ed70a3864cbd97b25cc8ca2c0bc7',
    ....
}

```


 To change **encData** label you need to pass extra parameter to **generateJWT** method:
e.g.

 ``` javascript
 const token = await jwtEncrypt.generateJWT(
      jwtDetails,
      publicData,
      encryption,
      privateData,
      'session',
    );

```

will result in having:

``` javascript
{
    iss: 'NKInVWhB1rVLCwxltMNuiUC6h9UudAbi',
    data: {
      public: {
            data1: 1,
            data2: 2,
            data3: 3
        },
      session: '5fb8ed70a3864cbd97b25cc8ca2c0bc7',
    },
  },

 ```

 also to read you will need to pass new filed name

 e.g.

 ``` javascript
// Encryption settings
const encryption = {
    key: 'AAAAAAAAAAAAAA',
    algorithm: 'aes-256-cbc',
  };

const decrypted = jwtEncrypt.readJWT(token, encryption, 'session');

 ```