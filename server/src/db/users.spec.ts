import { migrateDb, cleanDb } from '../utils/test_db'
import { getUserById, getUserByUsername } from './users'
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
      `INSERT INTO users (id, username, password, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5)`,
      [1, 'john', 'xxxx', new Date(), new Date()]
    )
  })

  const res = await getUserById(1)
  expect(res.id).toEqual(1)
  expect(res.username).toEqual('john')
  expect(res.password).toEqual('xxxx')
})

test('getUserByUsername returns an empty object if the user does not exist', async () => {
  const res = await getUserByUsername('john')
  expect(res).toEqual({})
})

test('getUserById returns a user when they exist', async () => {
  await queryHandler(function (client: Client) {
    return client.query(
      `INSERT INTO users (id, username, password, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5)`,
      [1, 'john', 'xxxx', new Date(), new Date()]
    )
  })

  const res = await getUserByUsername('john')
  expect(res.id).toEqual(1)
  expect(res.username).toEqual('john')
  expect(res.password).toEqual('xxxx')
})
