'use strict';

var util = require('util');

module.exports = function ResourceNotFoundError(message, exceptionMessage) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }

  this.name = this.constructor.name;
  this.message = message;
  this.exceptionMessage = exceptionMessage;
  this.status = 404;
};

util.inherits(module.exports, Error);
