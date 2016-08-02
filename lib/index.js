Object.defineProperty(exports, "__esModule", {
  value: true
});

var _plucker = require('./plucker');

var _plucker2 = _interopRequireDefault(_plucker);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isLicenseBad(goodLics) {
  var dbgr = (0, _debug2.default)(arguments.callee.name);
  return function (lic) {
    dbgr(lic, goodLics);
    if (!lic.license) {
      return false; // did not specify license so public domain is assumed
    } else {
      try {
        return isBadByType(lic, goodLics);
      } catch (e) {
        console.log(lic, e);
      }
    }
  };
}

function isBadByType(lic, goodLics) {
  var dbgr = (0, _debug2.default)(arguments.callee.name);
  dbgr(lic, goodLics);
  var isBad = false;
  switch (lic.license.constructor()) {
    case {}:
      isBad = !goodLics.includes(lic.license.type);
      break;
    case []:
    case '':
      isBad = !goodLics.some(function (goodLic) {
        return lic.license.includes(goodLic);
      });
      break;
  }
  return isBad;
}

function compareNameAndVersion(licA, licB) {
  var dbgr = (0, _debug2.default)(arguments.callee.name);
  dbgr(licA, licB);
  return licA.name === licB.name && licA.version === licB.version;
}

function notWhiteListed(whiteList) {
  var dbgr = (0, _debug2.default)(arguments.callee.name);
  return function (lic) {
    dbgr(lic, whiteList);
    return !whiteList.some(function (whiteLic) {
      return compareNameAndVersion(whiteLic, lic);
    });
  };
}

function packageAssertion(depKeys, whiteList, goodLicenses) {
  var dbgr = (0, _debug2.default)(arguments.callee.name);
  dbgr(depKeys, whiteList, goodLicenses);
  function asserter() {
    return (0, _plucker2.default)(depKeys).then(function (results) {
      return results.filter(notWhiteListed(whiteList)).filter(isLicenseBad(goodLicenses));
    });
  }
  return { asserter: asserter };
}

exports.default = packageAssertion;