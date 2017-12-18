# jwt-token-encrypt

This module allows you to generate JSON Web-Tokens with some elements of the data encrypted and read it in a very simple way, without worry too much about encryption.

## Using module
```javascript
import jwtEncrypt from 'jwt-token-encrypt';
```

## Creating JWT

```javascript
// Data that will be publicly available
let publicData = {
    role: "user"
};

// Data that will only be available to users who know encryption details.
let privateData = {
    email: "user",
    bank: "HSBC",
    pin: "1234",
};

// Encryption settings
let encryption = {
    key: 'AAAAAAAAAAAAAA',
    algorithm: 'aes-256-cbc',
  };

// JWT Settings
let jwtDetails = {
    iss: 'NKInVWhB1rVLCwxltMNuiUC6h9UudAbi',
};

let token = await jwtEncrypt.generateJWT(
      jwtDetails,
      publicData,
      encryptionSettings,
      privateData
    );
```

## Reading JWT

``` javascript
// Encryption settings
let encryption = {
    key: 'AAAAAAAAAAAAAA',
    algorithm: 'aes-256-cbc',
  };

const decrypted = jwtEncrypt.readJWT(token, encryption);

 ```
