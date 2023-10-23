import type { Request, Response } from 'express'
import { roleRepos, roleGroupRepos } from '../db'

export class addressService {
  newAddress = async (_req: Request, res: Response) => {
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

  getAddresses = (_req: Request, res: Response) => {
    roleRepos
      .findAll({})
      .then(roles => res.status(200).json(roles))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  deleteAddress = async (_req: Request, res: Response) => {
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeAddress = async (_req: Request, res: Response) => {
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
  newRegion = async (_req: Request, res: Response) => {
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

  getRegions = (_req: Request, res: Response) => {
    roleRepos
      .findAll({})
      .then(roles => res.status(200).json(roles))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  deleteRegion = async (_req: Request, res: Response) => {
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeRegion = async (_req: Request, res: Response) => {
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
}
