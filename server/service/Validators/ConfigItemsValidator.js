'use strict';

var ValidationError = require('../../utils/error/ValidationError');

module.exports = {

    configItemsUniqueValidator: (newItems) => {

        if (!newItems)
            newItems = [];

        if (newItems.length > 0) {

            // ensure there are no duplicate items in the new items
            let newItemKeys = newItems.map((value) => {
                return value.key;
            });

            if (new Set(newItemKeys).size !== newItemKeys.length) {
                throw new ValidationError(
                    "Config items validation error occurred",
                    [
                        {
                            code: 100005,
                            message: `Items contain duplicate keys`,
                            path: ['items']
                        }
                    ]);
            }

            // ensure that the size of the items does not exceed 100
            if (newItems.length > 100)
                throw new ValidationError(
                    "Config items validation error occurred",
                    [
                        {
                            code: 100006,
                            message: `Only a total of [100] items can be stored`,
                            path: ['items']
                        }
                    ]);
        }
        
    }
};
