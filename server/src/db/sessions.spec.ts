import { migrateDb, cleanDb } from '../utils/test_db'
import { getSessionById, createSession } from './sessions'
import { createUser } from './users'
import { queryHandler } from './connection'
import { Client } from 'pg'
import { v4 } from 'node-uuid'

beforeAll(async () => {
  await migrateDb()
})

beforeEach(async () => {
  await cleanDb()
})

test('getSessionById returns an empty object if the session does not exist', async () => {
  const uuid = v4()
  const res = await getSessionById(uuid)
  expect(res).toEqual({})
})

test('getSessionById returns a session when it exists', async () => {
  const user = await createUser('test@test.com', 'xxxx')
  const uuid = v4()

  await queryHandler(async function (client: Client) {
    await client.query(
      `INSERT INTO sessions (id, "userId", expiry, deactivated, "createdAt") VALUES ($1, $2, $3, $4, $5)`,
      [uuid, user.id, new Date(), false, new Date()]
    )
  })

  const res = await getSessionById(uuid)
  expect(res.userId).toEqual(user.id)
  expect(res.id).toEqual(uuid)
})

test('createUser returns the newly created user', async () => {
  const user = await createUser('test@test.com', 'xxxx')
  const res = await createSession(user.id)

  expect(res.userId).toEqual(user.id)
})
