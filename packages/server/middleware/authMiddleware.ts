import type { Request, Response, NextFunction } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { auth } from '../data/auth'
const { SECRET_KEY } = process.env

export interface CustomRequest extends Request {
  token: string | JwtPayload
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    console.log('token = ', token)
    if (!token) {
      return res.status(401).json({ message: auth.notification.notLogged })
    }
    const decoded = jwt.verify(token, SECRET_KEY as Secret)
    ;(req as CustomRequest).token = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: auth.notification.notLogged })
  }
}
