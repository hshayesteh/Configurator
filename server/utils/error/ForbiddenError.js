'use strict';

var util = require('util');

module.exports = function ForbiddenError(message) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }

  this.name = this.constructor.name;
  this.message = message;
  this.status = 401;
};

util.inherits(module.exports, Error);
