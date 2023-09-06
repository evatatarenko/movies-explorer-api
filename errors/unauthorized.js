const { HTTP_RES_CODES } = require('../utils/constants');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.type = HTTP_RES_CODES.unauthorized;
  }
}

module.exports = Unauthorized;
