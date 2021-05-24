'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const app = require('express')();
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const config = require('config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorHandler = require('./utils/error/ErrorHandler');

// swaggerRouter configuration
var options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './controllers'),
    useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

mongoose.connect(config.mongo.database_host, config.mongo.options);
mongoose.connection.on(
    'error',
    function(error) {
        logging.logAction(logging.logLevels.ERROR, 'MongoDB connection error', error.stack);
    }
);

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc,
    function(middleware) {
        app.get('/test',
            (req, res) => {
                res.setHeader('Content-Type', 'application/json');
                res.json({ sss: "sfsf" });
            });

        // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
        app.use(middleware.swaggerMetadata());

        // Validate Swagger requests
        app.use(middleware.swaggerValidator());

        // Route validated requests to appropriate controller
        app.use(middleware.swaggerRouter(options));

        // Serve the Swagger documents and Swagger UI
        app.use(middleware.swaggerUi());

        app.use(bodyParser.json());

        app.use(errorHandler.onError);

        // Start the server
        http.createServer(app).listen(config.server.port,
            function() {
                console.log('Your server is listening on port %d (http://localhost:%d)',
                    config.server.port,
                    config.server.port);
                console.log('Swagger-ui is available on http://localhost:%d/docs', config.server.port);
            });

    });