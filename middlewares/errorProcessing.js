const { HTTP_RES_CODES } = require('../utils/constants');

const errorProcesser = (err, req, res, next) => {
  // Internal Errors by default
  const { type = HTTP_RES_CODES.internalServerError, message } = err;
  res
    .status(type)
    .send({
      // send same status as error code
      message: type === HTTP_RES_CODES.internalServerError
        ? 'Internal server error'
        : message,
    });
  next();
};

module.exports = errorProcesser;
