/* eslint-env jest */
import chai from 'chai';
import jwt from 'jsonwebtoken';
import jwtCrypto from '../src/jwt-token-encrypt';
import fixtures from './__fixtures__/jwt-token-encrypt';

const expect = chai.expect;

describe('Create JWT', () => {
  let token;
  it('Validate JWT', async () => {
    token = await jwtCrypto.generateJWT(
      fixtures.jwtDetails,
      fixtures.public,
      fixtures.encryption,
      fixtures.confidential
    );

    const decoded = jwt.verify(token, fixtures.jwtDetails.secret);

    await delete decoded.iat;
    await delete decoded.exp;

    expect(decoded).to.to.deep.equal(fixtures.jwtDecoded);
  });

  it('Read and decode JWT', async () => {
    const decrypted = jwtCrypto.readJWT(token, fixtures.encryption);

    await delete decrypted.iat;
    await delete decrypted.exp;

    expect(decrypted).to.to.deep.equal(fixtures.jwtDecrypted);
  });
});
