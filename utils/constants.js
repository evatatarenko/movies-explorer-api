const MONGO_URL_DEV = 'mongodb://localhost:27017/bitfilmsdb';
const JWT_SECRET_DEV = 'secret-dev-key';
const SALT_PASSWORD_LEN = 10;
const TOKEN_EXPIRES = '7d';

const HTTP_RES_CODES = {
  success: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalServerError: 500,
};

module.exports = {
  MONGO_URL_DEV,
  JWT_SECRET_DEV,
  SALT_PASSWORD_LEN,
  TOKEN_EXPIRES,
  HTTP_RES_CODES,
};
