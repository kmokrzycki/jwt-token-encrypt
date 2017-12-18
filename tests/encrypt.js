/* eslint-env jest */
import chai from 'chai';
import encryption from '../src/encrypt';
import fixtures from './__fixtures__/encrypt';

const expect = chai.expect;

describe('JWT Encryption methods', () => {
  it('Test encrypt string method', () => {
    const input = fixtures.text.string;
    const expected = fixtures.text.encrypted;
    const result = encryption.encr(fixtures.encryption, input);
    expect(expected)
      .to.to.deep.equal(result);
  });
  it('Test encrypt object data', () => {
    const input = fixtures.object.input;
    const expected = fixtures.object.encrypted;
    const result = encryption.serializeEncr(fixtures.encryption, input);
    expect(expected)
      .to.to.deep.equal(result);
  });
});

describe('JWT Decryption methods', () => {
  it('Test decrypt string method', () => {
    const input = fixtures.text.encrypted;
    const expected = fixtures.text.string;
    const result = encryption.decr(fixtures.encryption, input);
    expect(expected).to.to.deep.equal(result);
  });
  it('Test decrypt object data', () => {
    const input = fixtures.object.encrypted;
    const expected = fixtures.object.input;
    const result = encryption.serializeDecr(fixtures.encryption, input);
    expect(expected)
      .to.to.deep.equal(result);
  });
});
