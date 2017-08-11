import { runMigrations } from './run_migrations'
import { unlockDb } from './unlock_db'
import { queryHandler } from '../db/connection'
import { Client } from 'pg'

export async function migrateDb (): Promise<{}> {
  await unlockDb()
  return runMigrations()
}

// TODO: There is some overhead here consider we truncate each table manually. Add a fancy PG function here
export function cleanDb () {
  return queryHandler(async function (client: Client) {
    await client.query(`DELETE FROM sessions`)
    await client.query(`DELETE FROM users`)
    return
  })
}
