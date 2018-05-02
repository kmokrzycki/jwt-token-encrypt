import jwt from 'jsonwebtoken';
import objectPath from 'object-path';
import crypt from './encrypt';


const generateJWT = async (jwtDetails, pubData = {}, encSettings = {}, encData = {}, encDataKey = 'encData') => {
  const jwtPayload = {
    public: pubData,
  };

  jwtPayload[encDataKey] = await crypt.serializeEncr(encSettings, encData);

  const jwtDefaults = {
    algorithm: 'HS256',
    expiresIn: '12h',
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
};

const readJWT = (tokenStr, encSettings, encDataKey = 'encData') => {
  const tokenData = jwt.decode(tokenStr);

  if (tokenData === null) throw new Error('Invalid JWT!');

  const publicData = objectPath.get(tokenData, 'data.public', {});
  const encryptedData = objectPath.get(tokenData, `data.${encDataKey}`, '');

  const newData = {
    ...publicData,
    ...crypt.serializeDecr(encSettings, encryptedData),
  };
  tokenData.data = newData;

  return tokenData;
};

export {
  generateJWT,
  readJWT,
};
