import { Pool, Client } from 'pg'
import { dbCreds } from '../config/db'

const pool = new Pool(dbCreds())

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// Pass the queryHandler a function that returns a promise and has the client as the first parameter
export async function queryHandler (queryFunction: Function): Promise<any> {
  const client = await pool.connect()
  try {
    const res = await queryFunction(client)
    return res
  } finally {
    client.release()
  }
}
