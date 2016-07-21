const packagePlucker = require('./index')
const createDebugger = require('debug')

const goodLics = ["MIT", "ISC", "Public domain"]

function isLicenseBad(lic) {
  let dbgr = createDebugger(arguments.callee.name)
  if (!lic.keyValue) {
    return false
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
  switch (lic.keyValue.constructor()) {
    case {}:
      isBad = !goodLics.includes(lic.keyValue.type)
      break;
    case []:
    case '':
      isBad = !goodLics.some(goodLic => lic.keyValue.includes(goodLic))
      break;
  }
  return isBad
}

packagePlucker("license", (error, results) => {
  let dbgr = createDebugger(arguments.callee.name)
  dbgr(`RESULTS: Length: ${results.length} first: ${JSON.stringify(results[0])} last: ${JSON.stringify(results.pop())}`)
  let badLics = results.filter(isLicenseBad)
  if(badLics.length > 0) {
    dbgr("HEY YOU CANT USE THAT HERE ", badLics)
  }
})
