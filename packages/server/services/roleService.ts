import type { Request, Response } from 'express'
import { roleRepos, roleGroupRepos } from '../db'

export class roleService {
  newRolesGroup = async (_req: Request, res: Response) => {
    try {
      await roleGroupRepos.create(_req.body)
      const rolesGroup = await roleGroupRepos.findAll({})
      res.status(200).json(rolesGroup)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
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
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
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
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
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
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  newRole = async (_req: Request, res: Response) => {
    try {
      await roleRepos.create(_req.body)
      const roles = await roleRepos.findAll({})
      res.status(200).json(roles)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
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
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
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
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  getAllRoles = async (_req: Request, res: Response) => {
    try {
      const roles = await roleRepos.findAll({})
      res.status(200).json(roles)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}
