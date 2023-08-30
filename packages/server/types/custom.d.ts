import { Request } from 'express'
import { JwtPayload, Secret } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      role?: string
      user?: string | JwtPayload
      token?: string | JwtPayload
      roleMiddleware: () => void
    }
  }
}
