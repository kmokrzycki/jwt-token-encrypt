import jwt from 'jsonwebtoken';
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

    const newData = {
      ...tokenData.data.public,
      ...crypt.serializeDecr(encSettings, tokenData.data.encData),
    };
    tokenData.data = newData;

    return tokenData;
  },
};
