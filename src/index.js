import packagePlucker from './plucker'
import Promise from 'bluebird'
import createDebugger from 'debug'

function isLicenseBad(goodLics) {
  let dbgr = createDebugger(arguments.callee.name)
  return function(lic) {
    dbgr(lic, goodLics)
    if (!lic.license) {
      return false         // did not specify license so public domain is assumed
    } else {
      try {
        return isBadByType(lic, goodLics)
      } catch (e) {
        console.log(lic, e)
      }
    }
  }
}

function isBadByType(lic, goodLics) {
  let dbgr = createDebugger(arguments.callee.name)
  dbgr(lic, goodLics)
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
  let dbgr = createDebugger(arguments.callee.name)
  dbgr(licA, licB)
  return licA.name === licB.name && licA.version === licB.version
}

function notWhiteListed(whiteList) {
  let dbgr = createDebugger(arguments.callee.name)
  return function(lic) {
    dbgr(lic, whiteList)
    return !whiteList.some(whiteLic => compareNameAndVersion(whiteLic, lic))
  }
}

function packageAssertion(depKeys, whiteList, goodLicenses) {
  let dbgr = createDebugger(arguments.callee.name)
  dbgr(depKeys, whiteList, goodLicenses)
  function asserter() {
    return packagePlucker(depKeys)
      .then(results => {
          return results
            .filter(notWhiteListed(whiteList))
            //.filter(isLicenseBad(goodLicenses))
    })
  }
  return { asserter }
}

export default packageAssertion
