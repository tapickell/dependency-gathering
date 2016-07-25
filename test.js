const packagePlucker = require('./index')
const createDebugger = require('debug')

const goodLics = [ "MIT"
                 , "ISC"
                 , "Public domain"
                 , "Apache"
                 , "BSD"
                 ]

const whiteList = [ {name: "amqp-event-bus-connector", version: '1.0.2'}
                  , {name: "tweetnacl", version: "0.14.3"}
                  ]

function isLicenseBad(lic) {
  let dbgr = createDebugger(arguments.callee.name)
  if (!lic.license) {
    return false // did not specify license so public domain is assumed
  } else {
    try {
      return isBadByType(lic)
    } catch (e) {
      dbgr(lic, e)
    }
  }
}

function isBadByType(lic) {
  let isBad = false
  switch (lic.license.constructor()) {
    case {}:
      isBad = !goodLics.includes(lic.license.type)
      break;
    case []:
    case '':
      isBad = !goodLics.some(goodLic => lic.license.includes(goodLic))
      break;
  }
  return isBad
}

function compareNameAndVersion(licA, licB) {
  return licA.name === licB.name && licA.version === licB.version
}

function notWhitelisted(lic) {
  return !whiteList.some(whiteLic => compareNameAndVersion(whiteLic, lic))
}

Array.prototype.countInChain = function() {
  let dbgr = createDebugger('countInChain')
  let t = Object(this)
  dbgr(`Length of List ${t.length}`)
  return t
}

packagePlucker(["name", "version", "license"], (error, results) => {
  let dbgr = createDebugger('packagePlucker')
  dbgr(`RESULTS: Length: ${results.length - 1} first: ${JSON.stringify(results[0])} last: ${JSON.stringify(results.pop())}`)

  let badLics = results.countInChain().filter(notWhitelisted).countInChain().filter(isLicenseBad).countInChain()
  if(badLics.length > 0) {
    dbgr("HEY YOU CANT USE THAT HERE!!!")
    dbgr(badLics)
  }
})
