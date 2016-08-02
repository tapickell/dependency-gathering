const exec = require('child_process').exec
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

function start(keys) {
  return new Promise((resolve, reject) => {
    exec(depsCommand, (error, stdout, sterr) => {
      if (error) {
        return reject(error)
      }
      let depKeys = _.chain(mapOutputToDepList(stdout))
                    .tail()
                    .filter(removeEmptyStrings)
                    .map(pathOfPackage)
                    .map(packageFor)
                    .map(keysFromPackage(keys))
                    .value()
      resolve(depKeys)
    })
  })
}

export default start
