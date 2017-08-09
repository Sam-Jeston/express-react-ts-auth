const bcrypt = require('bcryptjs')
import { createUser as insertUser } from '../db/users'
import { User } from '../db/interfaces'
const validator = require('validator')

export function createHashedPassword (password: string): Promise<string> {
  return new Promise((res, rej) => {
    bcrypt.genSalt(10, function(err: any, salt: string) {
      if (err) rej(err)
      bcrypt.hash(password, salt, function(errHash: any, hash: string) {
        if (err) rej(errHash)
        res(hash)
      })
    })
  })
}

export function validatePassword (password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createUser (email: string, password: string): Promise<User> {
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email address')
  }

  const hashedPassword = await createHashedPassword(password)
  return insertUser(email, hashedPassword)
}
