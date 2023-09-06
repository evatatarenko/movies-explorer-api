const MONGO_URL_DEV = 'mongodb://localhost:27017/bitfilmsdb';
const JWT_SECRET_DEV = 'secret-dev-key';
const SALT_PASSWORD_LEN = 10;
const TOKEN_EXPIRES = '7d';

module.exports = {
  MONGO_URL_DEV,
  JWT_SECRET_DEV,
  SALT_PASSWORD_LEN,
  TOKEN_EXPIRES,
};
