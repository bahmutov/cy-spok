/// <reference types="Cypress" />

import spok from './spok-helper'

it.only('spoks', () => {
  const object = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    helloWorld: 'hello world',
    anyNum: 999,
    anotherNum: 888,
    anArray: [1, 2],
    anotherArray: [1, 2, 3],
    anObject: {},
  }

  // using Spok
  // https://github.com/thlorenz/spok#readme
  cy.wrap(object, { timeout: 2000 }).should(
    spok({
      $topic: 'spok-example',
      one: spok.ge(1),
      two: 2,
      three: spok.range(2, 2),
      four: spok.lt(5),
      helloWorld: spok.startsWith('hello'),
      anyNum: spok.type('number'),
      anotherNum: spok.number,
      anArray: spok.array,
      anObject: spok.ne(undefined),
    }),
  )
})

it('uses should cb', () => {
  const o = {
    name: 'Hello world',
    guess: 50,
  }

  // using "regular" should callback function
  cy.wrap(o).should(obj => {
    expect(obj.name).to.match(/^Hello/)
    expect(obj.guess)
      .to.be.gte(1)
      .and.lte(10)
  })

  setTimeout(() => {
    o.guess = 7
  }, 1000)
})
