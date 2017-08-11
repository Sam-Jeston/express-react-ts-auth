import { queryHandler } from './connection'
import { Client } from 'pg'
import { Session } from './interfaces'
import { v4 } from 'node-uuid'

export function getSessionById (id: string, userId: number): Promise<Session> {
  return queryHandler(async function (client: Client) {
    const sessions: Session[] = (await client.query(`SELECT * FROM sessions WHERE id = $1 AND "userId" = $2`, [id, userId])).rows
    return sessions.length > 0 ? sessions[0] : {}
  })
}

export async function createSession (userId: number): Promise<Session> {
  // 12 Hours expiry. TODO: Config this
  const expiry = new Date(Date.now() + (1000 * 60 * 60 * 12))
  const id = v4()

  await queryHandler(async function (client: Client) {
    await client.query(
      `INSERT INTO sessions (id, "userId", expiry, deactivated, "createdAt") VALUES ($1, $2, $3, $4, $5)`,
      [v4(), userId, expiry, false, new Date()]
    )
  })

  return getSessionById(id, userId)
}
