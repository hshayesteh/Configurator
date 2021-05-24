'use strict';

const appService = require('../service/AppService');

module.exports = {

    /**
     * Creates a new app
     *
     * @param {ClientRequest} req - The http request object
     * @param {IncomingMessage} res - The http response object
     * @param {function} next - The callback used to pass control to the next action/middleware
     */
    createApp: async function(req, res, next) {
        let namespaceId = req.swagger.params['namespaceId'].value;
        let app = req.swagger.params['app'].value;

        try {
            let namespace = await appService.createApp(namespaceId, app);
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.json(namespace);
        } catch (e) {
            next(e);
        }

    },

    /**
     * Deletes an app
     *
     * @param {ClientRequest} req - The http request object
     * @param {IncomingMessage} res - The http response object
     * @param {function} next - The callback used to pass control to the next action/middleware
     */
    deleteApp: async function(req, res, next) {
        let namespaceId = req.swagger.params['namespaceId'].value;
        let id = req.swagger.params['id'].value;

        try {

            await appService.deleteApp(namespaceId, id);
            res.statusCode = 204;
            res.setHeader('Content-Type', 'application/json');
            res.json(namespace);
        } catch (e) {
            next(e);
        }
    },

    /**
     * Gets all the app entities
     *
     * @param {ClientRequest} req - The http request object
     * @param {IncomingMessage} res - The http response object
     * @param {function} next - The callback used to pass control to the next action/middleware
     */
    getAllApps: async function(req, res, next) {
        let namespaceId = req.swagger.params['namespaceId'].value;

        try {
            let namespaces = await appService.getAllApps(namespaceId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(namespaces);
        } catch (e) {
            next(e);
        }
    },

    /**
     * Gets a single app
     *
     * @param {ClientRequest} req - The http request object
     * @param {IncomingMessage} res - The http response object
     * @param {function} next - The callback used to pass control to the next action/middleware
     */
    getApp: async function(req, res, next) {
        let namespaceId = req.swagger.params['namespaceId'].value;
        let id = req.swagger.params['id'].value;

        try {
            let namespace = await appService.getApp(namespaceId, id);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(namespace);
        } catch (e) {
            next(e);
        }
    },

    /**
     * Returns the aggregated config items for a given app
     *
     * @param {ClientRequest} req - The http request object
     * @param {IncomingMessage} res - The http response object
     * @param {function} next - The callback used to pass control to the next action/middleware
     */
    getAppConfig: async function(req, res, next) {
        let namespaceId = req.swagger.params['namespaceId'].value;
        let id = req.swagger.params['id'].value;

        try {
            let namespace = await appService.getAppConfig(namespaceId, id);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(namespace);
        } catch (e) {
            next(e);
        }
    },

    /**
     * Patches an app
     *
     * @param {ClientRequest} req - The http request object
     * @param {IncomingMessage} res - The http response object
     * @param {function} next - The callback used to pass control to the next action/middleware
     */
    patchApp: async function(req, res, next) {
        let namespaceId = req.swagger.params['namespaceId'].value;
        let id = req.swagger.params['id'].value;
        let app = req.swagger.params['app'].value;

        try {
            let namespace = await appService.patchApp(namespaceId, id, app);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(namespace);
        } catch (e) {
            next(e);
        }
    }
};