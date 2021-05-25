var excludedEnv = ['beta', 'production', 'sandbox', 'default'];
if (process.env.NODE_ENV === undefined || excludedEnv.indexOf(process.env.NODE_ENV) !== -1) {
    process.env.NODE_ENV = 'testing';
}

var mochaReporter = 'spec';
if (process.env.NODE_ENV === 'ci') {
  mochaReporter = 'xunit-file';
} 

var Mocha = require('mocha');
var fs = require('fs');
var mongoose = require('mongoose');
var config = require('config');

var options = {
  'reporter' : mochaReporter
};

// Instantiate a Mocha instance.
var mocha = new Mocha(options);
var testDir = './tests/';
// List of directories that will run at the end
var excludedDir = ['endpoint'];
// To run only specific unit tests add your class here in as 'endpoint/user-test.js'
var customDir = [];

// Add excluded directories that need to run last
var addExclusionDir = function addExclusions() {
  excludedDir.forEach(
    function (file) {
        readTestDir(testDir + file + '/');
    }
  );
};

var dropDatabase = function () {

    try {
        // mongoose.connect(config.mongo.database_host, config.mongo.options);
        let connection = mongoose.createConnection(config.mongo.database_host, function (err) {
            if (err) {
                throw err;
            }
            connection.db.dropDatabase(function (err) {
                if (err) {
                    throw err;
                }
                connection.close();
            });
        });

    } catch (error) {
        console.error(`An error occurred while dropping the database with host [${config.mongo.database_host}]`, error);
    }
};

// Execute all tests added to mocha runlist
var runMocha = function () {
  mocha.run(function(failures){
    process.on('exit', function () {
        process.exit(failures);  // exit with non-zero status if there were failures
    });
  });
};

// Load the files into mocha run list if the file ends with JS
// This means the test directories can only have test and NO code files
var loadFiles = function loadTestFiles(file, path) {
  var pathStat = fs.statSync(path);
  if (pathStat && pathStat.isDirectory() && excludedDir.indexOf(file) === -1) {
    // If current file is actually a dir we call readTestDir. This will make the function
    // recursive until the last tier
    readTestDir(path + '/');
  } else if (file.substr(-3) === '.js') {
    mocha.addFile(path);
  }
};

// Read all files/dirs recursively from the specified testing directory
var readTestDir = function readTestDirectory(path) {
  // Project is still small so can do it synchronous
  fs.readdirSync(path).forEach(
    function (file) {
      loadFiles(file, path +  file);
    }
  );
};

if (!customDir || customDir.length === 0) {
    dropDatabase();
    // Read all files/dirs recursively from the specified testing directory
    readTestDir(testDir);
    // Adding exclusions(end point are part of this as we need time for the node server to start). Exclusion dirs
    // will be added to run last
    addExclusionDir();
    // Execute the mocha tests
    runMocha();
} else {
    dropDatabase();
    // Allow devs to run only specific unit test classes
    customDir.forEach(
        function (path) {
            loadFiles(path, testDir + path);
        }
    );
    // Execute the mocha tests
    runMocha();
}
