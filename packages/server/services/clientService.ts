import type { Request, Response } from 'express'
import { roleRepos, roleGroupRepos } from '../db'

export class clientService {
  newClientGroup = async (_req: Request, res: Response) => {
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

  getClientGroups = (_req: Request, res: Response) => {
    roleGroupRepos
      .findAll({})
      .then(roleGroup => res.status(200).json(roleGroup))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  deleteClientGroup = async (_req: Request, res: Response) => {
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeClientGroup = async (_req: Request, res: Response) => {
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

  getAllObjects = (_req: Request, res: Response) => {
    roleGroupRepos
      .findAll({
        where: _req.body,
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  getActiveObjects = (_req: Request, res: Response) => {
    const dataFind = { ..._req.body, active: true }
    roleGroupRepos
      .findAll({
        where: dataFind,
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  newObject = async (_req: Request, res: Response) => {
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

  deleteObject = async (_req: Request, res: Response) => {
    const { selectedUsers } = _req.body
    try {
      const user = await roleGroupRepos.update(selectedUsers, {
        active: false,
      })
      res
        .status(200)
        .json(
          `User ${selectedUsers} with id=${user} has acquired the inactive status!`
        )
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeObject = async (_req: Request, res: Response) => {
    const { id, userData } = _req.body
    try {
      await roleGroupRepos.update(id, userData)
      const { id_division, id_department } = userData
      const dataFind = { id_division, id_department, active: true }
      const rolesGroup = await roleGroupRepos.findAll({ where: dataFind })
      res.status(200).json(rolesGroup)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  pullObjectFromArchive = async (_req: Request, res: Response) => {
    const { selectedUsers } = _req.body
    try {
      await roleGroupRepos.update(selectedUsers, {
        active: true,
      })
      const users = await roleGroupRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(users)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  fulldeleteObject = async (_req: Request, res: Response) => {
    const { selectedUsers } = _req.body
    try {
      const users = await Promise.all([
        await selectedUsers.map(async (value: string) => {
          await roleGroupRepos.destroy({
            where: { id: value },
          })
        }),
        await roleGroupRepos.findAll({}),
      ])
      res.status(200).json(users[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  getAllClients = (_req: Request, res: Response) => {
    roleGroupRepos
      .findAll({
        where: _req.body,
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  getActiveClients = (_req: Request, res: Response) => {
    const dataFind = { ..._req.body, active: true }
    roleGroupRepos
      .findAll({
        where: dataFind,
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  newClient = async (_req: Request, res: Response) => {
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

  deleteClient = async (_req: Request, res: Response) => {
    const { selectedUsers } = _req.body
    try {
      const user = await roleGroupRepos.update(selectedUsers, {
        active: false,
      })
      res
        .status(200)
        .json(
          `User ${selectedUsers} with id=${user} has acquired the inactive status!`
        )
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  fulldeleteClient = async (_req: Request, res: Response) => {
    const { selectedUsers } = _req.body
    try {
      const users = await Promise.all([
        await selectedUsers.map(async (value: string) => {
          await roleGroupRepos.destroy({
            where: { id: value },
          })
        }),
        await roleGroupRepos.findAll({}),
      ])
      res.status(200).json(users[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeClient = async (_req: Request, res: Response) => {
    const { id, userData } = _req.body
    try {
      await roleGroupRepos.update(id, userData)
      const { id_division, id_department } = userData
      const dataFind = { id_division, id_department, active: true }
      const rolesGroup = await roleGroupRepos.findAll({ where: dataFind })
      res.status(200).json(rolesGroup)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  pullClientFromArchive = async (_req: Request, res: Response) => {
    const { selectedUsers } = _req.body
    try {
      await roleGroupRepos.update(selectedUsers, {
        active: true,
      })
      const users = await roleGroupRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(users)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
