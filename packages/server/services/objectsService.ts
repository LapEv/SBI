import { Addresses, Clients, ObjectsRepos, Regions } from '../db'
import type { Request, Response } from 'express'
const { Op } = require('sequelize')

const includes = [
  {
    model: Clients,
    required: false,
    attributes: ['client'],
  },
  {
    model: Addresses,
    required: false,
    attributes: ['address'],
  },
  {
    model: Regions,
    required: false,
    attributes: ['region'],
  },
]

export class objectsService {
  newObject = async (_req: Request, res: Response) => {
    try {
      await ObjectsRepos.create({ ..._req.body, active: true })
      const objects = await ObjectsRepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(objects)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to set new contract', err],
      })
    }
  }

  getAllObjects = (_req: Request, res: Response) => {
    ObjectsRepos.findAll({ include: includes })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getObjects = (_req: Request, res: Response) => {
    ObjectsRepos.findAll({
      where: { active: true },
      include: includes,
    })
      .then(objects => {
        res.status(200).json(objects)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteObjects = async (_req: Request, res: Response) => {
    const { selectedObjects } = _req.body
    try {
      const objects = await Promise.all([
        await selectedObjects.map(async (id: string) => {
          await ObjectsRepos.update(id, {
            active: false,
          })
        }),
        await ObjectsRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedObjects } },
          include: includes,
        }),
      ])
      res.status(200).json(objects[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  fullDeleteObjects = async (_req: Request, res: Response) => {
    const { selectedObjects } = _req.body
    try {
      const objects = await Promise.all([
        await selectedObjects.map(async (id: string) => {
          await ObjectsRepos.destroy({
            where: { id },
          })
        }),
        await ObjectsRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedObjects } },
          include: includes,
        }),
      ])
      res.status(200).json(objects[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  pullObjectFromArchive = async (_req: Request, res: Response) => {
    const { selectedObjects } = _req.body
    try {
      await ObjectsRepos.update(selectedObjects, {
        active: true,
      })
      const objects = await ObjectsRepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(objects)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeObject = async (_req: Request, res: Response) => {
    const {
      object,
      id_address,
      id_region,
      id_client,
      internalClientID,
      internalClientName,
      id,
    } = _req.body
    try {
      await ObjectsRepos.update(id, {
        object,
        id_address,
        id_region,
        id_client,
        internalClientID,
        internalClientName,
      })
      const objects = await ObjectsRepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(objects)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
