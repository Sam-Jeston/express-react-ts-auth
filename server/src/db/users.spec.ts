import { migrateDb, cleanDb } from '../utils/test_db'
import { getUserById, getUserByEmail, createUser } from './users'
import { queryHandler } from './connection'
import { Client } from 'pg'

beforeAll(async () => {
  await migrateDb()
})

beforeEach(async () => {
  await cleanDb()
})

test('getUserById returns an empty object if the user does not exist', async () => {
  const res = await getUserById(1)
  expect(res).toEqual({})
})

test('getUserById returns a user when they exist', async () => {
  await queryHandler(function (client: Client) {
    return client.query(
      `INSERT INTO users (id, email, password, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5)`,
      [1, 'john', 'xxxx', new Date(), new Date()]
    )
  })

  const res = await getUserById(1)
  expect(res.id).toEqual(1)
  expect(res.email).toEqual('john')
  expect(res.password).toEqual('xxxx')
})

test('getUserByEmail returns an empty object if the user does not exist', async () => {
  const res = await getUserByEmail('john')
  expect(res).toEqual({})
})

test('getUserById returns a user when they exist', async () => {
  await queryHandler(function (client: Client) {
    return client.query(
      `INSERT INTO users (id, email, password, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5)`,
      [1, 'john', 'xxxx', new Date(), new Date()]
    )
  })

  const res = await getUserByEmail('john')
  expect(res.id).toEqual(1)
  expect(res.email).toEqual('john')
  expect(res.password).toEqual('xxxx')
})

test('createUser returns the newly created user', async () => {
  const res = await createUser('john', 'xxxx')
  expect(res.email).toEqual('john')
  expect(res.password).toEqual('xxxx')
})
