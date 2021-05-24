'use strict';

var util = require('util');

module.exports = function ServerError(err) {
  Error.call(this);
  this.code = 'INTERNAL_SERVER_ERROR';
  var errorMessage = 'Server encountered an internal error and was unable to complete your request';

  if (err.message !== undefined) {
    errorMessage = err.message;
    }

  this.message = errorMessage;

  if (err.stack !== undefined) {
    this.stack = err.stack;
  }
};

util.inherits(module.exports, Error);
