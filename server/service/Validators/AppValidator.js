'use strict';

var App = require('../../models/App');
var ValidationError = require('../../utils/error/ValidationError');
var ResourceNotFoundError = require('../../utils/error/ResourceNotFoundError');

module.exports = {

    uniqueAppValidator: async (namespaceId, appName) => {

        let existingApp = await App.findOne({ name: appName, namespaceId });

        if (existingApp) {
            throw new ValidationError(
                "App validation error occurred",
                [
                    {
                        code: 100002,
                        message: `An app with the same name already exists`,
                        path: ['name']
                    }
                ]);

        }
    },
    appExistsValidator: async (appId) => {

        let existingApp = await App.findById(appId);
        if (!existingApp) {
            throw new ResourceNotFoundError("App was not found");

        }
    }
};
