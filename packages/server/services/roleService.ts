import type { Request, Response } from 'express'
import { roleRepos, roleGroupRepos } from '../db'

export class roleService {
  newRolesGroup = async (_req: Request, res: Response) => {
    try {
      await roleGroupRepos.create(_req.body)
      const rolesGroup = await roleGroupRepos.findAll({})
      res.status(200).json(rolesGroup)
    } catch (err: any) {
      res
        .status(500)
        .json({ error: ['db error: unable to set role group', err] })
    }
  }

  getRolesGroup = (_req: Request, res: Response) => {
    roleGroupRepos
      .findAll({})
      .then(roleGroup => res.status(200).json(roleGroup))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  deleteRolesGroup = async (_req: Request, res: Response) => {
    console.log('нельзя удалить SUPERADMIN ? ADMIN = ')
    const data = _req.body
    try {
      const rolesGroup = await Promise.all([
        await data.map(async (value: string) => {
          await roleGroupRepos.destroy({
            where: { id: value },
          })
        }),
        await roleGroupRepos.findAll({}),
      ])
      res.status(200).json(rolesGroup[1])
    } catch (err: any) {
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeRolesGroup = async (_req: Request, res: Response) => {
    console.log('_req.body = ', _req.body)
    const { roles, activeRolesGroup } = _req.body
    try {
      const result = await roleGroupRepos.update(activeRolesGroup, {
        roles: roles,
      })
      console.log('result = ', result)
      const rolesGroup = await roleGroupRepos.findAll({})
      res.status(200).json(rolesGroup)
    } catch (err: any) {
      res.status(500).json({ error: ['db error', err] })
    }
  }

  // getAllRolesGroup = () => {
  //   roleGroupRepos
  //     .findAll({})
  //     .then(roleGroup => console.log('roleGroup = ', roleGroup))
  //     /* eslint-disable */
  //     .catch(err => {
  //       error: `db error, ${err.status}`
  //     })
  //   /* eslint-enable */
  // }

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
            where: { id: value },
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
