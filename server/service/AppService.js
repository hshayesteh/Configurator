'use strict';


/**
 * Creates an app
 *
 * namespaceId UUID The id of the namespace entity that the app is linked to
 * app AppCreateRequest The app entity details
 * returns namespaceResponse
 **/
exports.createApp = function(namespaceId,app) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "createdAt" : "createdAt",
  "name" : "name",
  "_id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "items" : [ {
    "value" : "value",
    "key" : "key"
  }, {
    "value" : "value",
    "key" : "key"
  } ],
  "updatedAt" : "updatedAt"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes an app
 *
 * namespaceId UUID The id of the namespace entity that the app is linked to
 * id UUID The id of the app entity that will be deleted
 * no response value expected for this operation
 **/
exports.deleteApp = function(namespaceId,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns all the app records
 *
 * namespaceId UUID The id of the namespace entity that the app is linked to
 * returns List
 **/
exports.getAllApps = function(namespaceId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "createdAt" : "createdAt",
  "namespaceId" : "namespaceId",
  "name" : "name",
  "_id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "items" : [ {
    "value" : "value",
    "key" : "key"
  }, {
    "value" : "value",
    "key" : "key"
  } ],
  "updatedAt" : "updatedAt"
}, {
  "createdAt" : "createdAt",
  "namespaceId" : "namespaceId",
  "name" : "name",
  "_id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "items" : [ {
    "value" : "value",
    "key" : "key"
  }, {
    "value" : "value",
    "key" : "key"
  } ],
  "updatedAt" : "updatedAt"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets a single app
 *
 * namespaceId UUID The id of the namespace entity that the app is linked to
 * id UUID The id of the app entity that will be fetched
 * returns appResponse
 **/
exports.getApp = function(namespaceId,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "createdAt" : "createdAt",
  "namespaceId" : "namespaceId",
  "name" : "name",
  "_id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "items" : [ {
    "value" : "value",
    "key" : "key"
  }, {
    "value" : "value",
    "key" : "key"
  } ],
  "updatedAt" : "updatedAt"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Patches an app
 *
 * namespaceId UUID The id of the namespace entity that the app is linked to
 * id UUID The id of the app entity that will be patched
 * app AppPatchRequest The app entity details
 * returns appResponse
 **/
exports.patchApp = function(namespaceId,id,app) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "createdAt" : "createdAt",
  "namespaceId" : "namespaceId",
  "name" : "name",
  "_id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "items" : [ {
    "value" : "value",
    "key" : "key"
  }, {
    "value" : "value",
    "key" : "key"
  } ],
  "updatedAt" : "updatedAt"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

