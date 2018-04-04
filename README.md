# jwt-token-encrypt

[![Known Vulnerabilities](https://snyk.io/test/github/kmokrzycki/jwt-token-encrypt/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kmokrzycki/jwt-token-encrypt?targetFile=package.json)

This module allows you to generate JSON Web-Tokens with some elements of the data encrypted and read it in a very simple way, without worry too much about encryption.

## Install
```javascript
npm install 'jwt-token-encrypt' --save
```

## Usage
```javascript
import jwtEncrypt from 'jwt-token-encrypt';
```

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
