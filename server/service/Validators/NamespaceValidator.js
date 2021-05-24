'use strict';

var Namespace = require('../../models/Namespace');
var ValidationError = require('../../utils/error/ValidationError');
var ResourceNotFoundError = require('../../utils/error/ResourceNotFoundError');

module.exports = {

    uniqueNamespaceValidator: async (namespaceName) => {

        let existingNamespace = await Namespace.findOne({ name: namespaceName });
        if (existingNamespace) {
            throw new ValidationError(
                "Namespace validation error occurred",
                [
                    {
                        code: 100001,
                        message: `A namepsace with the same name already exists`,
                        path: ['name']
                    }
                ]);

        }
    },
    namespaceExistsValidator: async (namespaceId) => {

        let existingNamespace = await Namespace.findById(namespaceId);
        if (!existingNamespace) {
            throw new ResourceNotFoundError("Namespace was not found");

        }
    }
};
