import { IRequest } from '../index'
import { Response } from 'express'

export function errorHandler (err: Error, req: IRequest, res: Response, next: Function) {
  const message = err.message
  return res.status(500).json({message})
}
