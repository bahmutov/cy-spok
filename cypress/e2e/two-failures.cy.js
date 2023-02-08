/// <reference types="cypress" />

import spok from '../..'

it('shows the first failure only', () => {
  // in the test below, there are 3 passing checks
  // and two failures. Only the first failure
  // is shown, and all passing checks are shown
  cy.wrap({
    name: 'Joe',
    age: 42,
    job: 'chimney sweeper',
    location: 'Boston',
    present: true,
  }).should(
    spok({
      name: 'Mary', // fails
      age: 42, // passes
      job: 'secret agent', // fails
      location: 'Boston', // passes
      present: spok.type('boolean'), // passes
    }),
  )
})
