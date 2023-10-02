import type { Request, Response } from 'express'
import { roleRepos, roleGroupRepos } from '../db'

export class roleService {
  newRolesGroup = (_req: Request, res: Response) => {
    roleGroupRepos
      .create(_req.body)
      .then(roleGroup => {
        res.status(200).json(`set rolesGroup ok, ${roleGroup}`)
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: ['db error: unable to set rolesGroup', err] })
      )
  }
  getRolesGroup = (_req: Request, res: Response) => {
    roleGroupRepos
      .findAll({})
      .then(roleGroup => res.status(200).json(roleGroup))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  deleteRolesGroup = (_req: Request, res: Response) => {
    const { group } = _req.body
    roleGroupRepos
      .destroy({
        where: { group },
      })
      .then(result =>
        res.status(200).json(`Role=${group} id:${result} deleted!`)
      )
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  getAllRolesGroup = () => {
    roleGroupRepos
      .findAll({})
      .then(roleGroup => console.log('roleGroup = ', roleGroup))
      /* eslint-disable */
      .catch(err => {
        error: `db error, ${err.status}`
      })
    /* eslint-enable */
  }

  newRole = async (_req: Request, res: Response) => {
    try {
      await roleRepos.create(_req.body)
      const roles = await roleRepos.findAll({})
      res.status(200).json(roles)
    } catch (err: any) {
      res.status(500).json({ error: ['db error: unable to set role', err] })
    }
  }
  getRoles = (_req: Request, res: Response) => {
    roleRepos
      .findAll({})
      .then(roles => res.status(200).json(roles))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  deleteRole = async (_req: Request, res: Response) => {
    const data = _req.body
    try {
      const roles = await Promise.all([
        await data.map(async (value: string) => {
          await roleRepos.destroy({
            where: { role: value },
          })
        }),
        await roleRepos.findAll({}),
      ])
      res.status(200).json(roles[1])
    } catch (err: any) {
      res.status(500).json({ error: ['db error', err] })
    }
  }
  getAllRoles = () => {
    roleRepos
      .findAll({})
      .then(roles => roles.map(value => value.roles))
      /* eslint-disable */
      .catch(err => {
        error: `db error, ${err.status}`
      })
    /* eslint-enable */
  }
}
