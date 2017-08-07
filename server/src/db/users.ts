import { queryHandler } from './connection'
import { Client } from 'pg'
import { User } from './interfaces'

export function getUserById (id: number): Promise<User> {
  return queryHandler(async function (client: Client) {
    const users: User[] = (await client.query(`SELECT * FROM users WHERE id = $1`, [id])).rows
    return users.length > 0 ? users[0] : {}
  })
}

export function getUserByUsername (username: string): Promise<User> {
  return queryHandler(async function (client: Client) {
    const users: User[] = (await client.query(`SELECT * FROM users WHERE username = $1`, [username])).rows
    return users.length > 0 ? users[0] : {}
  })
}
