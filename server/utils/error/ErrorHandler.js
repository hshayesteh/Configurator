'use strict';

const ServerError = require('./ServerError');

const VALIDATION_ERROR = "ValidationError";
const NOT_FOUND_ERROR = "ResourceNotFoundError";
const AUTHORIZATION_ERROR = "AuthorizationError";
const FORBIDDEN_ERROR = "ForbiddenError";
const SERVER_ERROR = "ServerError";

module.exports = {

    onError: function(error, request, response, next) {

        let errorName = error.name;
        let errorForDisplay = {}

        if (errorName) {
            switch (errorName) {
                case VALIDATION_ERROR:
                    response.statusCode = 400;
                    errorForDisplay = prepareClientErrorForDisplay(error);
                    break;
                case NOT_FOUND_ERROR:
                    response.statusCode = 404;
                    errorForDisplay = prepareClientErrorForDisplay(error);
                    break;
                case AUTHORIZATION_ERROR:
                    response.statusCode = 401;
                    errorForDisplay = prepareClientErrorForDisplay(error);
                    break;
                case FORBIDDEN_ERROR:
                    response.statusCode = 403;
                    errorForDisplay = prepareClientErrorForDisplay(error);
                    break;
                case SERVER_ERROR:
                    response.statusCode = 500;
                    errorForDisplay = error;
                    break;
                default:
                    next(error);
                    break;
            }
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(errorForDisplay));

        } else {
            next(error);
        }
    }
};

function prepareClientErrorForDisplay(error) {
    var errForDisplay = {};
    if (error.code) {
        errForDisplay.code = error.code;
    } else {
        errForDisplay.code = 'VALIDATION_ERROR';
    }

    if (error.message) {
        errForDisplay.message = error.message;
    }
    if (error.results) {
        errForDisplay.errors = error.results.errors;
    }
    return errForDisplay;
}