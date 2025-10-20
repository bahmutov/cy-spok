const { defineConfig } = require('cypress')
// https://github.com/bahmutov/cypress-esbuild-preprocessor
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on('file:preprocessor', createBundler())
    },
  },
})
