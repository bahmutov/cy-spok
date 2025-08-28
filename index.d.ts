// // import {
//   SpokAssertions,
//   SpokConfig,
//   Specifications,
//   SpokFunctionAny,
//   Assert,
// } from '@bahmutov/spok/dist/spok'
// import { ExpectFn } from '@bahmutov/spok/dist/adapter-chai-expect'

// declare type SpokFunction<Subject> = (currentSubject: Subject) => void

// declare type SpokHelper<Subject = any> = (
//   specifications: Specifications<Subject>,
// ) => SpokFunction<Subject>

// declare const Spok: SpokHelper &
//   SpokAssertions &
//   SpokConfig & {
//     any: SpokFunctionAny
//     adapters: {
//       chaiExpect: (expectFn: ExpectFn<any>) => Assert
//     }
//   }

// export = Spok
