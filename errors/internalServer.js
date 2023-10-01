const { HTTP_RES_CODES } = require('../utils/constants');

class InternalServer extends Error {
  constructor(message) {
    super(message);
    this.type = HTTP_RES_CODES.internalServerError;
  }
}

module.exports = InternalServer;
