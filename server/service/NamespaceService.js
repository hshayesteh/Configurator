'use strict';
var Namespace = require('../models/Namespace');
var namespaceValidator = require('./Validators/NamespaceValidator');
var ResourceNotFoundError = require('../utils/error/ResourceNotFoundError');

module.exports = {

    /**
     * Creates a namespace
     *
     * @param {NamespaceCreateRequest} namespaceRequest The namespace entity details
     *
    * @returns {namespaceResponse} 
     */
    createNamespace: async function (namespace) {
        // validate that a namespace with the same key does not already exist
        await namespaceValidator.uniqueNamespaceValidator(namespace.name);

        let entity = new Namespace(namespace);

        await entity.save();

        return entity;
    },

    /**
     * Deletes a namespace
     *
     * @param {UUID} id - The id of the namespace entity that will be deleted
     */
    deleteNamespace: async function (id) {
        await namespaceValidator.namespaceExistsValidator(id);
        await Namespace.deleteOne({ _id: id });
    },
    
    /**
     * Deletes a namespace
     *
     * @param {UUID} id - The id of the namespace entity that will be deleted
     */
    patchNamespace: async function (id, namespace) {
        let existingNamespace = await Namespace.findById(id);

        if (!existingNamespace) {
            throw new ResourceNotFoundError("Namespace was not found");
        }

        if (namespace.name) {
            await namespaceValidator.uniqueNamespaceValidator(namespace.name);
            existingNamespace.name = namespace.name;
        }

        if (namespace.items) {
            existingNamespace.items = namespace.items;
        }

        await existingNamespace.save();

        return existingNamespace;
    },
    
    /**
     * Gets a single namespace
     *
     * @param {UUID} id - The id of the namespace entity that will be fetched
     *
     * @return {namespaceResponse}
     */
    getNamespace: async function (id) {
        let existingNamespace = await Namespace.findById(id);

        if (!existingNamespace) {
            throw new ResourceNotFoundError("Namespace was not found");
        }

        return existingNamespace;
    },

    /**
     * Returns all the namespaces records
     */
    getAllNamespaces: async function () {
        let getAllResult = await Namespace.find().limit(100);
        return getAllResult;
    }
};