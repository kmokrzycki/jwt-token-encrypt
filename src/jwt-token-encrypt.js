import jwt from 'jsonwebtoken';
import objectPath from 'object-path';
import crypt from './encrypt';

export default {
  async generateJWT(jwtDetails, pubData = {}, encSettings = {}, encData = {}) {
    const jwtPayload = {
      public: pubData,
      encData: await crypt.serializeEncr(encSettings, encData),
    };

    return jwt.sign(
      {
        iss: jwtDetails.key,
        data: jwtPayload,
      },
      jwtDetails.secret,
      { expiresIn: '12h' },
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
