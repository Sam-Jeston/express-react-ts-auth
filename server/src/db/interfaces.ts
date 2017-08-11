export interface User {
  id?: number
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  id?: string
  userId: number
  expiry: Date
  deactivated: boolean
  createdAt: Date
}
