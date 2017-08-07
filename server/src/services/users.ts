const bcrypt = require('bcryptjs')

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
