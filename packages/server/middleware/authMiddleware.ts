import type { Request, Response, NextFunction } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
const { APInotifications } = require('../const')
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
    let token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: APInotifications.auth.notLogged })
    }
    const decoded = jwt.verify(token, SECRET_KEY as Secret)
    ;(req as CustomRequest).token = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: APInotifications.auth.notLogged })
  }
}
