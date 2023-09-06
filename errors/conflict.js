const { HTTP_RES_CODES } = require('../utils/constants');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.type = HTTP_RES_CODES.conflict;
  }
}

module.exports = Conflict;
