import crypto from 'crypto';

export default {
  encr(encryptionConfig, text) {
    const { algorithm, key, iv } = encryptionConfig;
    const cipher = crypto.createCipher(algorithm, key, iv);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },
  serializeEncr(encryptionConfig, object) {
    return this.encr(encryptionConfig, JSON.stringify(object));
  },
  decr(encryptionConfig, text) {
    const { algorithm, key, iv } = encryptionConfig;
    const decipher = crypto.createDecipher(algorithm, key, iv);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  },
  serializeDecr(encryptionConfig, text) {
    return JSON.parse(this.decr(encryptionConfig, text));
  },
};
