/// <reference types="cypress" />

import spok from '@bahmutov/spok'

// using the original spok
// https://github.com/thlorenz/spok
// const t = spok.adapters.chaiExpect(expect)

// crashes with "strip is not a function" error
it.skip('works with expect', () => {
  // @ts-ignore
  spok(t, { name: 'joe' }, { name: spok.string })
})
