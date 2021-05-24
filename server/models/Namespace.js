'use strict';

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const configItem = new schema(
    {
        "key": { type: String, required: true },
        "value": { type: String, required: true }
    }
);

const namespace = new schema(
  {
    name: {type: String, required: true},
    items: [configItem]
  },
  {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}}
);

/**
 * Defines the schema for the namespace model
 */
module.exports = mongoose.model('namespace', namespace);