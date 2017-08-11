import { IRequest } from '../index'
import { Response } from 'express'
import { createUser, validatePassword } from '../services/users'
import { getUserByEmail } from '../db/users'
import { v4 } from 'node-uuid'

export async function signup (req: IRequest, res: Response, next: Function) {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await getUserByEmail(email)
    if (user.email) return res.status(400).json({message: 'Invalid email'})

    const newUser = await createUser(email, password)
    res.cookie('userId', newUser.id, { signed: true })

    const sessionId = v4()
    res.status(201).json(newUser)
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export async function login (req: IRequest, res: Response, next: Function) {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await getUserByEmail(email)
    if (!user.email) return res.status(400).json({message: 'Invalid email or password'})

    const passwordIsValid = await validatePassword(password, user.password)
    if (passwordIsValid === false) return res.status(400).json({message: 'Invalid email or password'})

    res.cookie('userId', user.id, {signed: true})
    res.status(204).json()
  } catch (e) {
    console.error(e)
    next(e)
  }
}
