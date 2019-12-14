import spok from "spok"
import stripAnsi from "strip-ansi"

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
    const pass = deepEqual(actual, expected)
    if (!pass) {
      this.failed.push(msg)
    } else {
      this.passed.push(msg)
    }
  }
}

const spokHelper = (expectation) => {
  return function (value) {
    console.log('value', value)
    console.log('expectations', expectation)

    const assert = new Assert()
    spok(assert, value, expectation)

    const chaiUtilGetMessage = chai.util.getMessage

    chai.util.getMessage = function (assert, args) {
      return assert.__flags.message
    }

    assert.passed.forEach(message => {
      const msg = stripAnsi(message)
      expect(true, msg).to.be.true
    })

    assert.failed.forEach((message) => {
      const msg = stripAnsi(message)
      expect(true, msg).to.be.false
    })

    chai.util.getMessage = chaiUtilGetMessage
  }
}
// adds all spok conditions
Object.assign(spokHelper, spok)

export default spokHelper
