Object.defineProperty(exports, "__esModule", {
  value: true
});
var exec = require('child_process').exec;
var path = require('path');
var _ = require('underscore');

var depsCommand = 'npm ls --parseable';

function mapOutputToDepList(string) {
  return string.split('\n');
}

function pathOfPackage(string) {
  return path.join(string, "package.json");
}

function packageFor(string) {
  return require(string);
}

function keysFromPackage(keys) {
  return function (object) {
    return _.pick(object, keys);
  };
}

function tailOfPath(string) {
  return string.split('/').pop();
}

function removeEmptyStrings(item) {
  return item !== '';
}

function start(keys) {
  return new Promise(function (resolve, reject) {
    exec(depsCommand, function (error, stdout, sterr) {
      if (error) {
        return reject(error);
      }
      var depKeys = _.chain(mapOutputToDepList(stdout)).tail().filter(removeEmptyStrings).map(pathOfPackage).map(packageFor).map(keysFromPackage(keys)).value();
      resolve(depKeys);
    });
  });
}

exports.default = start;