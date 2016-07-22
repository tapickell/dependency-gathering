const exec = require('child_process').exec
const createDebugger = require('debug')
const path = require('path')
const _ = require('underscore')

const depsCommand = `npm ls --parseable`

function mapOutputToDepList(string) {
  return string.split('\n')
}

function pathOfPackage(string) {
  return path.join(string, "package.json")
}

function packageFor(string) {
  return require(string)
}

function keysFromPackage(keys) {
  return object => {
    return _.pick(object, keys)
  }
}

function tailOfPath(string) {
  return string.split('/').pop()
}

function removeEmptyStrings(item) {
  return item !== ''
}

Array.prototype.removeThisPackage = function() {
  let t = Object(this)
  return t.slice(1)
}

function start(keys, cb) {
  exec(depsCommand, (error, stdout, sterr) => {
    let depKeys = mapOutputToDepList(stdout).removeThisPackage().filter(removeEmptyStrings).map(pathOfPackage).map(packageFor).map(keysFromPackage(keys))
    cb(null, depKeys)
  })
}

module.exports = start
