'use strict';
const Namespace = require('../models/Namespace');
const namespaceValidator = require('./Validators/NamespaceValidator');
const configItemsValidator = require('./Validators/ConfigItemsValidator');
const ResourceNotFoundError = require('../utils/error/ResourceNotFoundError');

module.exports = {

    /**
     * Creates a namespace
     *
     * @param {NamespaceCreateRequest} namespaceRequest The namespace entity details
     *
    * @returns {namespaceResponse} 
     */
    createNamespace: async function (namespace) {
        
        await namespaceValidator.uniqueNamespaceValidator(namespace.name);

        if (namespace.items) {
            configItemsValidator.configItemsUniqueValidator(namespace.items);
        }

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

            configItemsValidator.configItemsUniqueValidator(namespace.items);

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