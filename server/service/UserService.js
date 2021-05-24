'use strict';


/**
 * Authenticates a user
 *
 * user UserAuthenticateRequest The user credentials
 * returns userResponse
 **/
exports.authenticateUser = function(user) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "createdAt" : "createdAt",
  "_id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "username" : "username",
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
 * Returns all the users records
 *
 * returns List
 **/
exports.getAllUsers = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "createdAt" : "createdAt",
  "_id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "username" : "username",
  "updatedAt" : "updatedAt"
}, {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "createdAt" : "createdAt",
  "_id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "username" : "username",
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
 * Gets a single user
 *
 * id UUID The id of the user entity that will be fetched
 * returns userResponse
 **/
exports.getUser = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "createdAt" : "createdAt",
  "_id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "username" : "username",
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
 * Registers a user
 *
 * user UserRegisterRequest The user details
 * returns namespaceResponse
 **/
exports.registerUser = function(user) {
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

