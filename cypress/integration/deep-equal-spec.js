/// <reference types="cypress" />

import spok from '../..'

it('default deep.equal vs spok', () => {
  const person = {
    name: {
      first: 'John',
      last: 'Doe',
    },
    age: 30,
    address: {
      street: '123 Main St.',
      city: 'Anytown',
      state: 'CA',
      zip: 12345,
    },
  }

  const expected = Cypress._.cloneDeep(person)
  // simulate failure by changing one of the props
  // expected.address.city = 'New York'
  // delete person.address.city

  cy.log('default deep.equal')
  cy.wrap(person, { timeout: 0 }).should('deep.equal', expected)

  cy.log('using spok')
  // note: spok only fails if the values are not equal
  // but can pass if the expected object has fewer properties
  cy.wrap(person, { timeout: 0 }).should(spok(expected))
})

it('compares arrays by value', () => {
  const a = [1, { name: 'Joe' }, [3, 4]]
  cy.wrap(a, { timeout: 0 }).should(
    spok({
      length: 3,
      0: 1, // at first position is number 1
      1: { name: spok.string }, // an object with a string property "name"
      2: (a) => Array.isArray(a) && a.length === 2, // array with two elements
    }),
  )
})
