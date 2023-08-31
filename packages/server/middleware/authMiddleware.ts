import type { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { auth } from '../data/auth'
const { SECRET_KEY } = process.env

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
    if (!token) {
      return res.status(401).json({ message: auth.notification.notLogged })
    }
    req.body = jwt.verify(token, SECRET_KEY as Secret)
    next()
  } catch (e) {
    res.status(401).json({ message: auth.notification.notLogged })
  }
}
