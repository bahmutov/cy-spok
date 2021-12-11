# cy-spok [![renovate-app badge][renovate-badge]][renovate-app] ![cypress version](https://img.shields.io/badge/cypress-9.1.0-brightgreen)

> Playing with [spok](https://github.com/thlorenz/spok) inside Cypress test

<!-- prettier-ignore-start -->
CI | status
--- | ---
[lint](.github/workflows/lint.yml) | ![Lint status](https://github.com/bahmutov/cy-spok/workflows/lint/badge.svg?branch=master)
[badges](.github/workflows/badges.yml) | ![Badges status](https://github.com/bahmutov/cy-spok/workflows/badges/badge.svg?branch=master)
[cy-spok](.github/workflows/main.yml) | ![GH Action status](https://github.com/bahmutov/cy-spok/workflows/main/badge.svg?branch=master)
[cy-spok-example](https://github.com/bahmutov/cy-spok-example) | ![cy-spok-example status](https://github.com/bahmutov/cy-spok-example/workflows/tests/badge.svg?branch=master)
<!-- prettier-ignore-end -->

## Learn

- Watch [Introduction To cy-spok Plugin For Writing Powerful Assertions For Objects](https://www.youtube.com/watch?v=MLDsqBd_gVU)
- Read [Asserting Network Calls from Cypress Tests](https://www.cypress.io/blog/2019/12/23/asserting-network-calls-from-cypress-tests/)

## Install

```
$ npm i -D cy-spok
```

## Use

See [spok](https://github.com/thlorenz/spok#readme) docs

```js
// in your Cypress spec file
import spok from 'cy-spok'

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
    $topic: 'spok-example', // optional
    one: spok.ge(1),
    two: 2,
    three: spok.range(2, 6),
    four: spok.lt(5),
    helloWorld: spok.startsWith('hello'),
    anyNum: spok.type('number'),
    anotherNum: spok.number,
    anArray: spok.array,
    anObject: spok.ne(undefined),
  }),
)
```

See [cypress/integration/spec.js](cypress/integration/spec.js) here and in the [cy-spok-example](https://github.com/bahmutov/cy-spok-example) repo.

![Spok in action](img/cy-spok.gif)

## vs deep.equal

Spok prints a lot more information when using it compared to `deep.equal`. Note that Spok is a subset, not strict value equality.

![deep.equal vs spok for complex objects](./img/vs-deep-equal.png)

See [deep-equal-spec.js](./cypress/integration/deep-equal-spec.js)

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
