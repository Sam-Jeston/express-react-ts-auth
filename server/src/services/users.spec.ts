import { createHashedPassword, validatePassword } from './users'

test('a password hash created with bcrypt returns true when validated', async () => {
  const hash = await createHashedPassword('starlight')
  const validation = await validatePassword('starlight', hash)
  expect(validation).toEqual(true)
})

test('a password hash created with bcrypt returns false when incorrectly validated', async () => {
  const hash = await createHashedPassword('starlight')
  const validation = await validatePassword('starlights', hash)
  expect(validation).toEqual(false)
})
