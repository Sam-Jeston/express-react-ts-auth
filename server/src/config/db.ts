export interface DbCreds {
  user: string
  host: string
  database: string
  password: string
  port: number
}

export const database = 'application'

export function dbCreds (): DbCreds {
  if (process.env.NODE_ENV === 'development') {
    return {
      user: 'postgres',
      host: 'postgres',
      database: database,
      password: 'postgres',
      port: 5432,
    }
  } else if (process.env.NODE_ENV === 'production') {
    return {
      user: 'postgres',
      host: 'postgres',
      database: database,
      password: 'postgres',
      port: 5432,
    }
  }
}

export function dbInitCreds (): DbCreds {
  if (process.env.NODE_ENV === 'development') {
    return {
      user: 'postgres',
      host: 'postgres',
      database: 'postgres',
      password: 'postgres',
      port: 5432,
    }
  } else if (process.env.NODE_ENV === 'production') {
    return {
      user: 'postgres',
      host: 'postgres',
      database: 'postgres',
      password: 'postgres',
      port: 5432,
    }
  }
}
