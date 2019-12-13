/// <reference types="Cypress" />

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

// Cypress.Commands.overwrite('should', (should, ...args) => {
//   if (args[1] === 'spok' && Object.keys(args[2].length > 1)) {
//     // create individual should assertions
//     // expect(args[0], 'spok', Cypress._.pick(args[2], 'name'))
//     // expect(args[0], 'spok', Cypress._.pick(args[2], 'guess'))
//     // expect('foo').to.equal('foo')
//     // expect('bar').to.equal('bar')
//     const obj = args[0]
//     return should(args[0], () => {
//       console.log('inside should callback')
//       expect('foo').to.equal('foo')
//       expect('bar').to.equal('bar')
//     })
//   } else {
//     console.log('calling original should')
//     return should(...args)
//   }
// })

const spokAssertion = (_chai, utils) => {
  function checkSpok(expectation) {
    console.log('_chai is', _chai)
    console.log('utils', utils)
    console.log('value', this._obj)
    console.log('expectations', expectation)

    const assert = new Assert()
    spok(assert, this._obj, expectation)

    const agreement = assert.passed.map(stripAnsi).join(', ')
    if (agreement) {
      this.assert(true, agreement)
    }

    if (assert.failed.length) {
      assert.failed.forEach((message) => {
        this.assert(false, stripAnsi(message))
      })
    } else {
      // assert.passed.forEach(message => {
      //   this.assert(true, stripAnsi(message))
      // })
    }
  }

  _chai.Assertion.addMethod('spok', checkSpok)
}

chai.use(spokAssertion)

it('spoks', () => {
  const o = {
    name: 'Hello world',
    guess: 50
  }

  // using Spok
  cy.wrap(o).should('spok', {
    name: spok.startsWith('Hello'),
    guess: spok.range(1, 10)
  })

  setTimeout(() => {
    o.guess = 7
  }, 1000)
})

it('uses should cb', () => {
  const o = {
    name: 'Hello world',
    guess: 50
  }

  // using "regular" should callback function
  cy.wrap(o).should(obj => {
    expect(obj.name).to.match(/^Hello/)
    expect(obj.guess).to.be.gte(1).and.lte(10)
  })

  setTimeout(() => {
    o.guess = 7
  }, 1000)
})
