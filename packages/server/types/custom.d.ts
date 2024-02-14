import { JwtPayload } from 'jsonwebtoken'
import { Sequelize } from 'sequelize'

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
