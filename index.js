const spok = require('@bahmutov/spok').default
const stripAnsi = require('strip-ansi')

if (!Cypress) {
  throw new Error('Missing Cypress global')
}
if (!Cypress._) {
  throw new Error('Missing Cypress._ property')
}
if (!Cypress._.isEqual) {
  throw new Error('Missing Cypress._.isEqual method')
}

spok.color = false
spok.printDescription = false

class Assert {
  constructor() {
    this.failed = []
    this.passed = []
  }

  equal(actual, expected, msg) {
    if (actual !== expected) {
      this.failed.push(msg)
    } else {
      this.passed.push(msg)
    }
  }

  deepEqual(actual, expected, msg) {
    const pass = Cypress._.isEqual(actual, expected)
    if (!pass) {
      this.failed.push(msg)
    } else {
      this.passed.push(msg)
    }
  }
}

const spokHelper = (expectation) => {
  return function (value) {
    const assert = new Assert()
    spok(assert, value, expectation)

    // by default, Chai assertions will print actual and expected values
    // but Spok already gives us the complete error message
    // we overwrite util.getMessage to simply return Spok's message
    // Make sure to restore the original getMessage in all circumstances!
    const chaiUtilGetMessage = chai.util.getMessage

    try {
      chai.util.getMessage = function (assert, args) {
        return assert.__flags.message
      }

      assert.passed.forEach((message) => {
        const msg = stripAnsi(message)
        // create passing assertion in the Command Log
        expect(true, msg).to.be.true
      })

      assert.failed.forEach((message) => {
        const msg = stripAnsi(message)
        // create failing assertion in the Command Log
        expect(true, msg).to.be.false
      })
    } finally {
      chai.util.getMessage = chaiUtilGetMessage
    }
  }
}
// adds all spok conditions
Object.assign(spokHelper, spok)
spokHelper.spok = spok

module.exports = spokHelper
