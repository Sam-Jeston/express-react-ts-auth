import { createHashedPassword, validatePassword, createUser } from './users'
import { migrateDb, cleanDb } from '../utils/test_db'

beforeAll(async () => {
  await migrateDb()
})

beforeEach(async () => {
  await cleanDb()
})

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

test('createUser stores a user with the correct password hash', async () => {
  const user = await createUser('john@example.com', 'starlight')
  const validation = await validatePassword('starlight', user.password)
  expect(validation).toEqual(true)
})
