'use strict';

var utils = require('../utils/writer.js');
var App = require('../service/AppService');

module.exports.createApp = function createApp (req, res, next) {
  var namespaceId = req.swagger.params['namespaceId'].value;
  var app = req.swagger.params['app'].value;
  App.createApp(namespaceId,app)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteApp = function deleteApp (req, res, next) {
  var namespaceId = req.swagger.params['namespaceId'].value;
  var id = req.swagger.params['id'].value;
  App.deleteApp(namespaceId,id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllApps = function getAllApps (req, res, next) {
  var namespaceId = req.swagger.params['namespaceId'].value;
  App.getAllApps(namespaceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getApp = function getApp (req, res, next) {
  var namespaceId = req.swagger.params['namespaceId'].value;
  var id = req.swagger.params['id'].value;
  App.getApp(namespaceId,id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.patchApp = function patchApp (req, res, next) {
  var namespaceId = req.swagger.params['namespaceId'].value;
  var id = req.swagger.params['id'].value;
  var app = req.swagger.params['app'].value;
  App.patchApp(namespaceId,id,app)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
