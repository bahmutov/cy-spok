import spok from '../..'

it('works with explicit expect', () => {
  const checkName = spok({
    name: spok.string,
    age: spok.range(1, 100),
  })

  checkName({ name: 'joe', age: 25 })

  // uncomment to see error messages
  // checkName({ name: 42 })
  // checkName({ firstName: 'joe' })
  // checkName({ name: 'joe', age: -20 })
})
