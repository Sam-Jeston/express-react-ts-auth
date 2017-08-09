import { queryHandler } from './connection'
import { Client } from 'pg'
import { User } from './interfaces'

export function getUserById (id: number): Promise<User> {
  return queryHandler(async function (client: Client) {
    const users: User[] = (await client.query(`SELECT * FROM users WHERE id = $1`, [id])).rows
    return users.length > 0 ? users[0] : {}
  })
}

export function getUserByEmail (email: string): Promise<User> {
  return queryHandler(async function (client: Client) {
    const users: User[] = (await client.query(`SELECT * FROM users WHERE email = $1`, [email])).rows
    return users.length > 0 ? users[0] : {}
  })
}

export async function createUser (email: string, hashedPassword: string): Promise<User> {
  await queryHandler(async function (client: Client) {
    await client.query(
      `INSERT INTO users (email, password, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4)`,
      [email, hashedPassword, new Date(), new Date()]
    )
  })

  return getUserByEmail(email)
}
