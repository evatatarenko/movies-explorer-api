const { HTTP_RES_CODES } = require('../utils/constants');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.type = HTTP_RES_CODES.notFound;
  }
}

module.exports = NotFound;
