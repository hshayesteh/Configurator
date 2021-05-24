'use strict';

const App = require('../models/App');
const Namespace = require('../models/Namespace');
const namespaceValidator = require('./Validators/NamespaceValidator');
const configItemsValidator = require('./Validators/ConfigItemsValidator');
const appValidator = require('./Validators/AppValidator');
const ResourceNotFoundError = require('../utils/error/ResourceNotFoundError');
const ValidationError = require('../utils/error/ValidationError');

module.exports = {

    /**
     * Creates an app
     *
     * @param {String} namespaceId - The id of the namespace entity that the app is linked to
     * @param {AppCreateRequest} app - The app entity details
     *
    * @returns {AppResponse}
     */
    createApp: async function(namespaceId, app) {
        await namespaceValidator.namespaceExistsValidator(namespaceId);

        await appValidator.uniqueAppValidator(namespaceId, app.name);

        if (app.items) {
            configItemsValidator.configItemsUniqueValidator(app.items);
        }

        let entity = new App(app);

        entity.namespaceId = namespaceId;

        await entity.save();

        return entity;
    },

    /**
     * Deletes an app
     *
     * @param {String} namespaceId - The id of the namespace entity that the app is linked to
     * @param {String} id - The id of the app entity that will be deleted
     */
    deleteApp: async function(namespaceId, id) {
        await appValidator.appExistsValidator(id);
        await App.deleteOne({ _id: id });
    },

    /**
     * Returns all the app records
     *
     * @param {String} namespaceId - The id of the namespace entity that the app is linked to
     *
    * @returns {List}
     */
    getAllApps: async function(namespaceId) {
        let getAllResult = await App.find({ namespaceId }).limit(100);
        return getAllResult;

    },

    /**
     * Gets a single app
     *
     * @param {String} namespaceId - The id of the namespace entity that the app is linked to
     * @param {String} id - The id of the app entity that will be fetched
     *
     * @returns {AppResponse}
     */
    getApp: async function(namespaceId, id) {
        let existingApp = await App.findById(id);

        if (!existingApp) {
            throw new ResourceNotFoundError("App was not found");
        }

        return existingApp;
    },

    /**
     * Returns the aggregated config items for a given app
     *
     * @param {String} namespaceId - The id of the namespace entity that the app is linked to
     * @param {String} id - The id of the app entity that will be patched
     *
     * @returns {List}
     */
    getAppConfig: async function(namespaceId, id) {
        let existingApp = await App.findById(id);

        if (!existingApp) {
            throw new ResourceNotFoundError("App was not found");
        }

        if (existingApp.namespaceId !== namespaceId) {
            throw new ValidationError(
                "App validation error occurred",
                [
                    {
                        code: 100003,
                        message: `The namespaceId does not match that of the app`,
                        path: ['namespaceId']
                    }
                ]);
        }

        let existingNamespace = await Namespace.findById(namespaceId);

        if (!existingNamespace) {
            throw new ResourceNotFoundError("Namespace was not found");
        }

        let response = [];

        if (existingApp.items && existingApp.items.length > 0) {
            response = existingApp.items;
        }

        if (existingNamespace.items && existingNamespace.items.length > 0) {
            existingNamespace.items.forEach((item) => {
                var doesNotExist = response.every((value) => {
                    return value.key !== item.key;
                });

                if (doesNotExist) {
                    response.push(item);
                }
            });
        }

        return response;
    },

    /**
     * Patches an app
     *
     * @param {String} namespaceId - The id of the namespace entity that the app is linked to
     * @param {String} id - The id of the app entity that will be patched
     * @param {AppCreateRequest} app - The app entity details
     *
    * @returns {AppResponse}
     */
    patchApp: async function(namespaceId, id, app) {
        let existingApp = await App.findById(id);

        if (!existingApp) {
            throw new ResourceNotFoundError("App was not found");
        }

        if (existingApp.namespaceId !== namespaceId) {
            throw new ValidationError(
                "App validation error occurred",
                [
                    {
                        code: 100003,
                        message: `The namespaceId does not match that of the app`,
                        path: ['namespaceId']
                    }
                ]);
        }

        if (app.name) {
            await appValidator.uniqueAppValidator(namespaceId, app.name);
            existingApp.name = app.name;
        }

        if (app.items) {
            configItemsValidator.configItemsUniqueValidator(app.items);
            existingApp.items = app.items;
        }

        await existingApp.save();

        return existingApp;
    }
};