import { ClientsRepos, ClientsGroupRepos, Contracts } from '../db'
import type { Request, Response } from 'express'
const { Op } = require('sequelize')
// interface ShortTypicalMalfunctions {
//   models: string[]
//   id: string
// }
export class clientService {
  newClient = async (_req: Request, res: Response) => {
    try {
      await ClientsRepos.create({ ..._req.body, active: true })
      const clients = await ClientsRepos.findAll({
        where: { active: true },
        include: [{ model: Contracts, through: { attributes: [] } }],
      })
      res.status(200).json(clients)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to set new client', err],
      })
    }
  }

  getAllClients = (_req: Request, res: Response) => {
    ClientsRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getClients = (_req: Request, res: Response) => {
    console.log('getClients')
    ClientsRepos.findAll({
      where: { active: true },
      include: [{ model: Contracts, through: { attributes: [] } }],
    })
      .then(clients => {
        console.log('clients = ', clients)
        res.status(200).json(clients)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteClient = async (_req: Request, res: Response) => {
    const { selectedClients } = _req.body
    try {
      const clients = await Promise.all([
        await selectedClients.map(async (id: string) => {
          await ClientsRepos.update(id, {
            active: false,
          })
        }),
        await ClientsRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedClients } },
        }),
      ])
      res.status(200).json(clients[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  fulldeleteClient = async (_req: Request, res: Response) => {
    const { selectedClients } = _req.body
    try {
      const clients = await Promise.all([
        await selectedClients.map(async (id: string) => {
          await ClientsRepos.destroy({
            where: { id },
          })
        }),
        await ClientsRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedClients } },
        }),
      ])
      res.status(200).json(clients[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  pullClientFromArchive = async (_req: Request, res: Response) => {
    const { selectedClients } = _req.body
    try {
      await ClientsRepos.update(selectedClients, {
        active: true,
      })
      const clients = await ClientsRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(clients)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeClient = async (_req: Request, res: Response) => {
    const { client, legalName, contracts, contacts, comments, id } = _req.body
    try {
      await ClientsRepos.update(id, {
        client,
        legalName,
        contracts,
        contacts,
        comments,
      })
      const clients = await ClientsRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(clients)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  newClientGroup = async (_req: Request, res: Response) => {
    try {
      await ClientsGroupRepos.create({ ..._req.body, active: true })
      const clientsGroup = await ClientsGroupRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(clientsGroup)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to set new client', err],
      })
    }
  }

  getAllClientGroups = (_req: Request, res: Response) => {
    ClientsGroupRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getClientGroups = (_req: Request, res: Response) => {
    ClientsGroupRepos.findAll({
      where: { active: true },
    })
      .then(clients => {
        res.status(200).json(clients)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteClientGroup = async (_req: Request, res: Response) => {
    const { selectedClientsGroup } = _req.body
    try {
      const clientsGroup = await Promise.all([
        await selectedClientsGroup.map(async (id: string) => {
          await ClientsGroupRepos.update(id, {
            active: false,
          })
        }),
        await ClientsGroupRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedClientsGroup } },
        }),
      ])
      res.status(200).json(clientsGroup[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  fulldeleteClientsGroup = async (_req: Request, res: Response) => {
    const { selectedClientsGroup } = _req.body
    try {
      const clientsGroup = await Promise.all([
        await selectedClientsGroup.map(async (id: string) => {
          await ClientsGroupRepos.destroy({
            where: { id },
          })
        }),
        await ClientsGroupRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedClientsGroup } },
        }),
      ])
      res.status(200).json(clientsGroup[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  pullClientsGroupFromArchive = async (_req: Request, res: Response) => {
    const { selectedClientsGroup } = _req.body
    try {
      await ClientsGroupRepos.update(selectedClientsGroup, {
        active: true,
      })
      const clientsGroup = await ClientsGroupRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(clientsGroup)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeClientGroup = async (_req: Request, res: Response) => {
    const { groupName, clients, id } = _req.body
    try {
      await ClientsRepos.update(id, {
        groupName,
        clients,
      })
      const clientsGroup = await ClientsGroupRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(clientsGroup)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
