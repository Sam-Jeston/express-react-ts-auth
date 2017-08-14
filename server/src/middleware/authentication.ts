import { IRequest, ApiPath } from '../index'
import { Response } from 'express'
import { getUserById } from '../db/users'
import { getSessionById } from '../db/sessions'

export async function authenticateRequest (req: IRequest, res: Response, next: Function) {
  try {
    const path = req.path
    if (path.substring(0, 4) === ApiPath.authenticationBasePath) {
      const targetCookie = req.signedCookies['appSession']
      if (!targetCookie) return res.status(401).json({message: 'Authentication required'})

      const session = await getSessionById(targetCookie)
      if (session.expiry < new Date()) return res.status(401).json({message: 'Session expired'})
      if (session.deactivated) return res.status(401).json({message: 'Session expired'})

      const user = await getUserById(session.userId)
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
