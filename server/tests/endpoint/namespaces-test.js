'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var customFormats = module.exports = function(zSchema) {
    // Placeholder file for all custom-formats in known to swagger.json
    // as found on
    // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat

    var decimalPattern = /^\d{0,8}.?\d{0,4}[0]+$/;

    /** Validates floating point as decimal / money (i.e: 12345678.123400..) */
    zSchema.registerFormat('double',
        function(val) {
            return !decimalPattern.test(val.toString());
        });

    /** Validates value is a 32bit integer */
    zSchema.registerFormat('int32',
        function(val) {
            // the 32bit shift (>>) truncates any bits beyond max of 32
            return Number.isInteger(val) && ((val >> 0) === val);
        });

    zSchema.registerFormat('int64',
        function(val) {
            return Number.isInteger(val);
        });

    zSchema.registerFormat('float',
        function(val) {
            // better parsing for custom "float" format
            if (Number.parseFloat(val)) {
                return true;
            } else {
                return false;
            }
        });

    zSchema.registerFormat('date',
        function(val) {
            // should parse a a date
            return !isNaN(Date.parse(val));
        });

    zSchema.registerFormat('dateTime',
        function(val) {
            return !isNaN(Date.parse(val));
        });

    zSchema.registerFormat('password',
        function(val) {
            // should parse as a string
            return typeof val === 'string';
        });
};

customFormats(ZSchema);

var validator = new ZSchema({});
var supertest = require('supertest');
var api = supertest('http://localhost:4000'); // supertest init;

chai.should();

var namespaceCreateRequest = {
    name: "development",
    items: [
        {
            key: "Key1",
            value: "Value1"
        },
        {
            key: "Key2",
            value: "Value2"
        }
    ]
}

describe('/namespaces', function() {
        it('should respond with 201 success response that the...', function(done) {
                /*eslint-disable*/
                var schema = {
                    "type": "object",
                    "required": [
                        "_id",
                        "name"
                    ],
                    "properties": {
                        "_id": {
                            "type": "string",
                            "description": "The id of the namespace"
                        },
                        "name": {
                            "type": "string",
                            "description": "The name of the namespace",
                            "maxLength": 128
                        },
                        "items": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "required": [
                                    "key",
                                    "value"
                                ],
                                "properties": {
                                    "key": {
                                        "type": "string",
                                        "description": "The item key",
                                        "maxLength": 128
                                    },
                                    "value": {
                                        "type": "string",
                                        "description": "The item value",
                                        "maxLength": 128
                                    }
                                },
                                "example": {
                                    "value": "value",
                                    "key": "key"
                                }
                            }
                        },
                        "createdAt": {
                            "type": "string",
                            "description": "The created date"
                        },
                        "updatedAt": {
                            "type": "string",
                            "description": "The updated date"
                        }
                    },
                    "example": {
                        "createdAt": "createdAt",
                        "name": "name",
                        "_id": "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
                        "items": [
                            {
                                "value": "value",
                                "key": "key"
                            },
                            {
                                "value": "value",
                                "key": "key"
                            }
                        ],
                        "updatedAt": "updatedAt"
                    }
                };

                /*eslint-enable*/
                api.post('/api/v1/namespaces')
                    .set('Content-Type', 'application/json')
                    .send(namespaceCreateRequest)
                    .expect(201)
                    .end(function(err, res) {
                        if (err) return done(err);

                        validator.validate(res.body, schema).should.be.true;
                        done();
                    });
        });

//        describe('get', function () {
//            //    it('should respond with 200 An array of namespaces', function(done) {
//            //      /*eslint-disable*/
//            //      var schema = {
//            //        "type": "array",
//            //        "items": {
//            //          "type": "object",
//            //          "required": [
//            //            "_id",
//            //            "name"
//            //          ],
//            //          "properties": {
//            //            "_id": {
//            //              "type": "string",
//            //              "description": "The id of the namespace"
//            //            },
//            //            "name": {
//            //              "type": "string",
//            //              "description": "The name of the namespace",
//            //              "maxLength": 128
//            //            },
//            //            "items": {
//            //              "type": "array",
//            //              "items": {
//            //                "type": "object",
//            //                "required": [
//            //                  "key",
//            //                  "value"
//            //                ],
//            //                "properties": {
//            //                  "key": {
//            //                    "type": "string",
//            //                    "description": "The item key",
//            //                    "maxLength": 128
//            //                  },
//            //                  "value": {
//            //                    "type": "string",
//            //                    "description": "The item value",
//            //                    "maxLength": 128
//            //                  }
//            //                },
//            //                "example": {
//            //                  "value": "value",
//            //                  "key": "key"
//            //                }
//            //              }
//            //            },
//            //            "createdAt": {
//            //              "type": "string",
//            //              "description": "The created date"
//            //            },
//            //            "updatedAt": {
//            //              "type": "string",
//            //              "description": "The updated date"
//            //            }
//            //          },
//            //          "example": {
//            //            "createdAt": "createdAt",
//            //            "name": "name",
//            //            "_id": "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
//            //            "items": [
//            //              {
//            //                "value": "value",
//            //                "key": "key"
//            //              },
//            //              {
//            //                "value": "value",
//            //                "key": "key"
//            //              }
//            //            ],
//            //            "updatedAt": "updatedAt"
//            //          }
//            //        }
//            //      };
//            //
//            //      /*eslint-enable*/
//            //      api.get('/api/v1/namespaces')
//            //      .set('Content-Type', 'application/json')
//            //      .expect(200)
//            //      .end(function(err, res) {
//            //        if (err) return done(err);
//            //
//            //        validator.validate(res.body, schema).should.be.true;
//            //        done();
//            //      });
//            //    });
//
//            //    it('should respond with 405 Method not supported Error...', function(done) {
//            //      /*eslint-disable*/
//            //      var schema = {
//            //        "type": "object",
//            //        "required": [
//            //          "code",
//            //          "message"
//            //        ],
//            //        "properties": {
//            //          "code": {
//            //            "type": "string"
//            //          },
//            //          "message": {
//            //            "type": "string"
//            //          },
//            //          "stack": {
//            //            "type": "string"
//            //          }
//            //        }
//            //      };
//            //
//            //      /*eslint-enable*/
//            //      api.get('/api/v1/namespaces')
//            //      .set('Content-Type', 'application/json')
//            //      .expect(405)
//            //      .end(function(err, res) {
//            //        if (err) return done(err);
//            //
//            //        validator.validate(res.body, schema).should.be.true;
//            //        done();
//            //      });
//            //    });
//            //
//            //    it('should respond with default unexpected error', function(done) {
//            //      /*eslint-disable*/
//            //      var schema = {
//            //        "type": "object",
//            //        "required": [
//            //          "code",
//            //          "message"
//            //        ],
//            //        "properties": {
//            //          "code": {
//            //            "type": "string"
//            //          },
//            //          "message": {
//            //            "type": "string"
//            //          },
//            //          "stack": {
//            //            "type": "string"
//            //          }
//            //        }
//            //      };
//            //
//            //      /*eslint-enable*/
//            //      api.get('/api/v1/namespaces')
//            //      .set('Content-Type', 'application/json')
//            //      .expect('DEFAULT RESPONSE CODE HERE')
//            //      .end(function(err, res) {
//            //        if (err) return done(err);
//            //
//            //        validator.validate(res.body, schema).should.be.true;
//            //        done();
//            //      });
//            //    });
//
//        });
//
//        describe('post', function () {
//            it('should respond with 400 Validation Error. Usually...', function (done) {
//                /*eslint-disable*/
//                var schema = {
//                    "type": "object",
//                    "required": [
//                        "code",
//                        "message"
//                    ],
//                    "properties": {
//                        "code": {
//                            "type": "string"
//                        },
//                        "message": {
//                            "type": "string"
//                        },
//                        "errors": {
//                            "type": "array",
//                            "items": {
//                                "type": "object",
//                                "required": [
//                                    "code",
//                                    "message",
//                                    "path"
//                                ],
//                                "properties": {
//                                    "code": {
//                                        "type": "string"
//                                    },
//                                    "message": {
//                                        "type": "string"
//                                    },
//                                    "path": {
//                                        "type": "array",
//                                        "items": {
//                                            "type": "string"
//                                        }
//                                    },
//                                    "description": {
//                                        "type": "string"
//                                    }
//                                }
//                            }
//                        }
//                    }
//                };
//
//                /*eslint-enable*/
//                api.post('/api/v1/namespaces')
//                    .set('Content-Type', 'application/json')
//                    .send({
//                        namespace: 'DATA GOES HERE'
//                    })
//                    .expect(400)
//                    .end(function (err, res) {
//                        if (err) return done(err);
//
//                        validator.validate(res.body, schema).should.be.true;
//                        done();
//                    });
//            });
//
//            it('should respond with 405 Method not supported Error...', function (done) {
//                /*eslint-disable*/
//                var schema = {
//                    "type": "object",
//                    "required": [
//                        "code",
//                        "message"
//                    ],
//                    "properties": {
//                        "code": {
//                            "type": "string"
//                        },
//                        "message": {
//                            "type": "string"
//                        },
//                        "stack": {
//                            "type": "string"
//                        }
//                    }
//                };
//
//                /*eslint-enable*/
//                api.post('/api/v1/namespaces')
//                    .set('Content-Type', 'application/json')
//                    .send({
//                        namespace: 'DATA GOES HERE'
//                    })
//                    .expect(405)
//                    .end(function (err, res) {
//                        if (err) return done(err);
//
//                        validator.validate(res.body, schema).should.be.true;
//                        done();
//                    });
//            });
//
//            it('should respond with default unexpected error', function (done) {
//                /*eslint-disable*/
//                var schema = {
//                    "type": "object",
//                    "required": [
//                        "code",
//                        "message"
//                    ],
//                    "properties": {
//                        "code": {
//                            "type": "string"
//                        },
//                        "message": {
//                            "type": "string"
//                        },
//                        "stack": {
//                            "type": "string"
//                        }
//                    }
//                };
//
//                /*eslint-enable*/
//                api.post('/api/v1/namespaces')
//                    .set('Content-Type', 'application/json')
//                    .send({
//                        namespace: 'DATA GOES HERE'
//                    })
//                    .expect('DEFAULT RESPONSE CODE HERE')
//                    .end(function (err, res) {
//                        if (err) return done(err);
//
//                        validator.validate(res.body, schema).should.be.true;
//                        done();
//                    });
//            });
//
//        });
    });