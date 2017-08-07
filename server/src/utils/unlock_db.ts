import { DbCreds, dbCreds, dbInitCreds, database } from '../config/db'
import { Client } from 'pg'
const { exec } = require('child_process')

const creds: DbCreds = dbCreds()
const initCreds: DbCreds = dbInitCreds()
const dbUrl = `postgres://${creds.user}:${creds.password}@${creds.host}/${creds.database}`

export function unlockDb () {
  exec(`DATABASE_URL=${dbUrl} npm run migrate-unlock`, function (error: any, stdout: any, stderr: any) {
    // console.log('stdout: ' + stdout)
    // console.log('stderr: ' + stderr)
    if (error !== null) {
      console.log('exec error: ' + error)
    }
  })
}
