// Type definitions for cy-spok wrapper
// The runtime export is a function (expectations) => (value) => void
// augmented with all the properties of underlying spok plus reference to the original spok.

import type spokOriginal from '@bahmutov/spok'

// Re-export selected upstream types for convenience
export type { Specifications } from '@bahmutov/spok/dist/spok'

// Pull in upstream default export type
type SpokRuntime = typeof spokOriginal

// Our assertion result collector (mirrors runtime implementation, but minimal surface)
export interface CySpokAssert {
  failed: string[]
  passed: string[]
  equal(actual: any, expected: any, msg?: string): void
  deepEqual(actual: any, expected: any, msg?: string): void
}

// Function returned by calling cy-spok with specifications; Cypress will call it with the subject value
export type CySpokFunction<Subject = any> = (value: Subject) => void

// Helper function signature: accepts specifications and returns a function to be used in cy.should()
export interface CySpokHelper {
  <Subject = any>(
    specifications: import('@bahmutov/spok/dist/spok').Specifications,
  ): CySpokFunction<Subject>
}

// The exported value combines callable helper + all spok predicates + a reference to original spok
export interface CySpok extends CySpokHelper, SpokRuntime {
  spok: SpokRuntime
}

declare const cySpok: CySpok
export default cySpok
