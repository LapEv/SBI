import type { Request, Response } from 'express'
import { roleRepos, roleGroupRepos } from '../db'

export class roleService {
  newRolesGroup = async (_req: Request, res: Response) => {
    try {
      await roleGroupRepos.create(_req.body)
      const rolesGroup = await roleGroupRepos.findAll({})
      res.status(200).json(rolesGroup)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res
        .status(500)
        .json({ error: ['db error: unable to set role group', err] })
    }
  }

  getRolesGroup = (_req: Request, res: Response) => {
    roleGroupRepos
      .findAll({})
      .then(rolesGroup => res.status(200).json(rolesGroup))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  deleteRolesGroup = async (_req: Request, res: Response) => {
    console.log('нельзя удалить SUPERADMIN ? ADMIN = ')
    const data = _req.body
    try {
      await roleGroupRepos.update(data, {
        active: false,
      })
      const rolesGroup = await roleGroupRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(rolesGroup)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  fullDeleteRolesGroup = async (_req: Request, res: Response) => {
    const { selectedRolesGroup } = _req.body
    try {
      await roleGroupRepos.destroy({
        where: { id: selectedRolesGroup },
      })
      const rolesGroup = await roleGroupRepos.findAll({})
      res.status(200).json(rolesGroup)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeRolesGroup = async (_req: Request, res: Response) => {
    const { roles, activeRolesGroup } = _req.body
    try {
      await roleGroupRepos.update(activeRolesGroup, {
        roles: roles,
      })
      const rolesGroup = await roleGroupRepos.findAll({})
      res.status(200).json(rolesGroup)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
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
      await roleRepos.update(data, {
        active: false,
      })
      const roles = await roleRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(roles)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  fullDeleteRole = async (_req: Request, res: Response) => {
    const { selectedRoles } = _req.body
    try {
      await roleRepos.destroy({
        where: { id: selectedRoles },
      })
      const roles = await roleRepos.findAll({})
      res.status(200).json(roles)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
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
