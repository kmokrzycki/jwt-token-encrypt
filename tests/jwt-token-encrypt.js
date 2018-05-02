/* eslint-env jest */
import chai from 'chai';
import jwt from 'jsonwebtoken';
import * as jwtCrypto from '../src/jwt-token-encrypt';
import fixtures from './__fixtures__/jwt-token-encrypt';

const { expect } = chai;

describe('Create/Read JWT', () => {
  let token;
  it('Validate JWT', async () => {
    token = await jwtCrypto.generateJWT(
      { ...fixtures.jwtDetails },
      fixtures.public,
      fixtures.encryption,
      fixtures.confidential,
    );

    const decoded = jwt.verify(token, fixtures.jwtDetails.secret);

    await delete decoded.iat;
    await delete decoded.exp;

    expect(decoded).to.to.deep.equal(fixtures.jwtDecoded);
  });

  it('Validate JWT Overwrites', async () => {
    token = await jwtCrypto.generateJWT(
      { ...fixtures.jwtDetailsOverwrite },
      fixtures.public,
      fixtures.encryption,
      fixtures.confidential,
    );

    const decoded = jwt.verify(token, fixtures.jwtDetails.secret);

    expect(decoded.exp - decoded.iat).to.to.equal(100);
  });

  it('Read and decode JWT', async () => {
    const decrypted = jwtCrypto.readJWT(token, fixtures.encryption);

    await delete decrypted.iat;
    await delete decrypted.exp;

    expect(decrypted).to.to.deep.equal(fixtures.jwtDecrypted);
  });

  it('Handle broken JWT', async () => {
    const badFn = () => { jwtCrypto.readJWT('NotJWTString', fixtures.encryption); };

    expect(badFn).to.throw(/Invalid JWT/);
  });

  it('Change encrypted field name', async () => {
    token = await jwtCrypto.generateJWT(
      { ...fixtures.jwtDetails },
      fixtures.public,
      fixtures.encryption,
      fixtures.confidential,
      'customField',
    );

    const decoded = jwt.verify(token, fixtures.jwtDetails.secret);

    await delete decoded.iat;
    await delete decoded.exp;

    expect(decoded).to.to.deep.equal(fixtures.jwtDecodedCustomEncField);
  });
});
