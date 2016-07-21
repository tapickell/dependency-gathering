## NPM Package Plucker (for lack of a better name atm)

Parses through your npm_modules package.json files and plucks out the
values for you key.

#### TODO for test

* this is for our tests only as the (soon to be) NPM module returns the values for
  the key you asked for and cares not for what you do with the data.

- [x] Be able to hande keyValue: ['MIT', 'NOPE']
- [x] Be able to hande keyValue: '(BSD-2-Clause OR MIT OR Apache-2.0)'
- [ ] Be able to know difference of AND vs OR: 'BSD-3-Clause AND MIT'
- [ ] Be able to handle duplicate dependencies, maybe, see `tweetnacl`
- [x] Be able to handle whitelisting of specific packages and versions
- [x] Hack Array.prototype because why not.
