'use strict';

var namespaceService = require('../service/NamespaceService');

module.exports = {

    /**
     * Create a new namespace
     *
     * @param {ClientRequest} req - The http request object
     * @param {IncomingMessage} res - The http response object 
     * @param {function} next -  next The callback used to pass control to the next action/middleware
     */
    createNamespace: async function (req, res, next) {
      try {
          let namespace = await namespaceService.createNamespace(req.swagger.params['namespace'].value);
          res.statusCode = 201;
          res.setHeader('Content-Type', 'application/json');
          res.json(namespace);
      } catch (e) {
          next(e);
      } 
    },

    /**
     * Delete a new namespace
     *
     * @param {ClientRequest} req - The http request object
     * @param {IncomingMessage} res - The http response object
     * @param {function} next -  next The callback used to pass control to the next action/middleware
     */
    deleteNamespace: async function (req, res, next) {
        try {

            await namespaceService.deleteNamespace(req.swagger.params['id'].value);
            res.statusCode = 204;
            res.setHeader('Content-Type', 'application/json');
            res.json(namespace);
        } catch (e) {
            next(e);
        }
    },

    /**
     * Gets all the namespaces
     *
     * @param {ClientRequest} req - The http request object
     * @param {IncomingMessage} res - The http response object
     * @param {function} next -  next The callback used to pass control to the next action/middleware
     */
    getAllNamespaces: async function (req, res, next) {
        try {
            let namespaces = await namespaceService.getAllNamespaces();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(namespaces);
        } catch (e) {
            next(e);
        }
    },

    /**
     * Gets a single namespace
     *
     * @param {ClientRequest} req - The http request object
     * @param {IncomingMessage} res - The http response object
     * @param {function} next -  next The callback used to pass control to the next action/middleware
     */
    getNamespace: async function (req, res, next) {
        try {
            let namespace = await namespaceService.getNamespace(req.swagger.params['id'].value);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(namespace);
        } catch (e) {
            next(e);
        }
    },

    /**
     * Patches a namespace
     *
     * @param {ClientRequest} req - The http request object
     * @param {IncomingMessage} res - The http response object
     * @param {function} next -  next The callback used to pass control to the next action/middleware
     */
    patchNamespace: async function (req, res, next) {
        try {
            let namespace = await namespaceService.patchNamespace(req.swagger.params['id'].value, req.swagger.params['namespace'].value);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(namespace);
        } catch (e) {
            next(e);
        }
    }

};