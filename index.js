const exec = require('child_process').exec
const createDebugger = require('debug')
const path = require('path')

const depsCommand = `npm ls --parseable`

function splitOnNewLine(string) {
  let dbgr = createDebugger(arguments.callee.name)
  //dbgr(string)
  return string.split('\n')
}

function pathOfPackage(string) {
  // pass dependency chain with
  let dbgr = createDebugger(arguments.callee.name)
  //dbgr(string)
  return path.join(string, "package.json")
}

function packageFor(string) {
  let dbgr = createDebugger(arguments.callee.name)
  //dbgr(string)
  return require(string)
}

function keyFromPackage(key) {
  return object => {
    let dbgr = createDebugger(arguments.callee.name)
    //dbgr(JSON.stringify(object))

    return { packageName: object.name, version: object.version, keyValue: object[key] }
  }
}

function tailOfPath(string) {
  let dbgr = createDebugger(arguments.callee.name)
  //dbgr(string)
  return string.split('/').pop()
}

function removeEmptyStrings(item) {
  return item !== ''
}

function start(key, cb) {
  let dbgr = createDebugger(arguments.callee.name)
  dbgr("In start function")

  exec(depsCommand, (error, stdout, sterr) => {
    let depKeys = splitOnNewLine(stdout).slice(1).filter(removeEmptyStrings).map(pathOfPackage).map(packageFor).map(keyFromPackage(key))
    //dbgr(depKeys)
    cb(null, depKeys)
  })
}

module.exports = start
