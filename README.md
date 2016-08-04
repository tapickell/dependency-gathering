## NPM Package Assertion

Parses through your npm_modules package.json files and plucks out the
values for the keys supplied.
Allows tests to make assertions on the keys from npm dependencies.

* This is currenlty used for validating npm licenses against a list of
  ok licenses.

#### TODO for test

* The inner plucker module returns the values for
  the keys you asked for and cares not for what you do with the data.
* The index module uses plucker to get the data it wants and then makes
  assertions off of that.
* Currently the assertions are hard coded but will later be a callback
  that is passed in to index.

- [ ] If there is `NPM ERR!` thrown don't allow it to break assertions.
- [ ] Allow tests to pass in a call back to make assertions
- [x] Be able to hande keyValue: ['MIT', 'NOPE']
- [x] Be able to hande keyValue: '(BSD-2-Clause OR MIT OR Apache-2.0)'
- [ ] Be able to know difference of AND vs OR: 'BSD-3-Clause AND MIT'
- [x] Be able to handle duplicate dependencies, maybe, see `tweetnacl`
- [x] Be able to handle whitelisting of specific packages and versions
- [x] Hack Array.prototype because why not.
