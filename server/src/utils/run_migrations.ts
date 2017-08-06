import { DbCreds, dbCreds, dbInitCreds, database } from '../config/db'
import { Client } from 'pg'
const { spawnSync } = require('child_process')

const creds: DbCreds = dbCreds()
const initCreds: DbCreds = dbInitCreds()
const dbUrl=`postgres://${creds.user}:${creds.password}@${creds.host}/${creds.database} node-pg-migrate`

export async function runMigrations () {
  const client = new Client({
    user: initCreds.user,
    host: initCreds.host,
    database: initCreds.database,
    password: initCreds.password,
    port: initCreds.port,
  })

  await client.connect()

  await client.query(`CREATE SCHEMA IF NOT EXISTS "${database}";`)
  await client.query(`GRANT ALL ON SCHEMA "application" TO ${creds.user};`)

  spawnSync(`DATABASE_URL=${dbUrl} npm run migrate-up`)
}
