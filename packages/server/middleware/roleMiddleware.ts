import { Request, Response, NextFunction } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { roleGroupRepos } from '../db'
const { SECRET_KEY } = process.env

module.exports = function (roles: []) {
  return async function (_req: Request, res: Response, next: NextFunction) {
    if (_req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = _req.header('Authorization')?.replace('Bearer ', '')
      if (!token) {
        return res.status(403).json({ message: 'The user is not logged in' })
      }
      const verifycode = jwt.verify(token, SECRET_KEY as Secret)
      const { rolesGroup } = verifycode as JwtPayload
      let hasRole = false

      const groupRoles = await roleGroupRepos.findAll({
        where: { group: rolesGroup },
      })
      console.log('groupRoles = ', groupRoles[0].roles)
      console.log('rolesGroup = ', rolesGroup)
      console.log('roles = ', roles)
      groupRoles[0].roles.forEach((item: string) => {
        console.log('item = ', item)
        if (roles.includes(item as never)) {
          console.log('hasRole')
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.status(403).json({ message: "You don't have access" })
      }
      next()
    } catch (e) {
      console.log(e)
      return res.status(403).json({ message: 'The user is not logged in' })
    }
  }
}
