import { IRequest, ApiPath } from '../index'
import { Response } from 'express'
import { getUserById } from '../db/users'

export async function authenticateRequest (req: IRequest, res: Response, next: Function) {
  try {
    const path = req.path
    if (path.substring(0, 4) === ApiPath.authenticationBasePath) {
      const targetCookie = req.signedCookies['userId']
      if (!targetCookie) return res.status(401).json({message: 'Authentication required'})
      const user = await getUserById(targetCookie)
      if (!user) return res.status(401).json({message: 'Authentication required'})
      req.user = user
      next()
    } else {
      next()
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}
