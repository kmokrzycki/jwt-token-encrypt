import jwt from 'jsonwebtoken';
import objectPath from 'object-path';
import crypt from './encrypt';

export default {
  async generateJWT(jwtDetails, pubData = {}, encSettings = {}, encData = {}) {
    const jwtPayload = {
      public: pubData,
      encData: await crypt.serializeEncr(encSettings, encData),
    };

    const jwtDefaults = {
      algorithm: 'HS256',
      expiresIn: '12h',
      // notBefore: '10s',
    };

    const jwtParams = { ...jwtDetails };

    const iss = jwtParams.key;
    delete (jwtParams.key);
    const { secret } = jwtParams;
    delete (jwtParams.secret);

    return jwt.sign(
      {
        iss,
        data: jwtPayload,
      },
      secret,
      {
        ...jwtDefaults,
        ...jwtParams,
      },
    );
  },

  readJWT(tokenStr, encSettings) {
    const tokenData = jwt.decode(tokenStr);

    if (tokenData === null) throw new Error('Invalid JWT!');

    const publicData = objectPath.get(tokenData, 'data.public', {});
    const encryptedData = objectPath.get(tokenData, 'data.encData', '');

    const newData = {
      ...publicData,
      ...crypt.serializeDecr(encSettings, encryptedData),
    };
    tokenData.data = newData;

    return tokenData;
  },
};
