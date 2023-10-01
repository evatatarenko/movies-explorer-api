const { HTTP_RES_CODES } = require('../utils/constants');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.type = HTTP_RES_CODES.forbidden;
  }
}

module.exports = Forbidden;
