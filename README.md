# cy-spok [![renovate-app badge][renovate-badge]][renovate-app] ![cypress version](https://img.shields.io/badge/cypress-9.3.1-brightgreen)

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

## Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2021

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)
- [videos](https://www.youtube.com/glebbahmutov)
- [presentations](https://slides.com/bahmutov)
- [cypress.tips](https://cypress.tips)
- [Cypress Advent 2021](https://cypresstips.substack.com/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cy-spok/issues) on Github

## MIT License

Copyright (c) 2021 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
