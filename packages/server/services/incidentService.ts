import { IncidentRepos, IncidentStatusesRepos, TypesOfWorkRepos } from './../db'
import type { Request, Response } from 'express'
const { Op } = require('sequelize')

export class incidentService {
  newIncidentStatuses = async (_req: Request, res: Response) => {
    try {
      await IncidentStatusesRepos.create({ ..._req.body, active: true })
      const incStatuses = await IncidentStatusesRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(incStatuses)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to set new incident statuses', err],
      })
    }
  }
  getAllIncidentStatuses = (_req: Request, res: Response) => {
    IncidentStatusesRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getIncidentStatuses = (_req: Request, res: Response) => {
    IncidentStatusesRepos.findAll({
      where: { active: true },
    })
      .then(incStatuses => {
        res.status(200).json(incStatuses)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteIncidentStatuses = async (_req: Request, res: Response) => {
    const { selectedINCStatuses } = _req.body
    try {
      const incStatuses = await Promise.all([
        await selectedINCStatuses.map(async (id: string) => {
          await IncidentStatusesRepos.update(id, {
            active: false,
          })
        }),
        await IncidentStatusesRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedINCStatuses } },
        }),
      ])
      res.status(200).json(incStatuses[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  fullDeleteIncidentStatuses = async (_req: Request, res: Response) => {
    const { selectedINCStatuses } = _req.body
    try {
      const incStatuses = await Promise.all([
        await selectedINCStatuses.map(async (id: string) => {
          await IncidentStatusesRepos.destroy({
            where: { id },
          })
        }),
        await IncidentStatusesRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedINCStatuses } },
        }),
      ])
      res.status(200).json(incStatuses[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  pullIncidentStatusesFromArchive = async (_req: Request, res: Response) => {
    const { selectedINCStatuses } = _req.body
    try {
      await IncidentStatusesRepos.update(selectedINCStatuses, {
        active: true,
      })
      const incStatuses = await IncidentStatusesRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(incStatuses)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeIncidentStatuses = async (_req: Request, res: Response) => {
    const { statusINC, id } = _req.body
    try {
      await IncidentStatusesRepos.update(id, { statusINC })
      const incStatuses = await IncidentStatusesRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(incStatuses)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  newTypeOfWork = async (_req: Request, res: Response) => {
    try {
      await TypesOfWorkRepos.create({ ..._req.body, active: true })
      const typesOfWork = await TypesOfWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesOfWork)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to set new incident statuses', err],
      })
    }
  }
  getAllTypesOfWork = (_req: Request, res: Response) => {
    TypesOfWorkRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getTypesOfWork = (_req: Request, res: Response) => {
    TypesOfWorkRepos.findAll({
      where: { active: true },
    })
      .then(typesOfWork => {
        res.status(200).json(typesOfWork)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteTypesOfWork = async (_req: Request, res: Response) => {
    const { selectedTypesOfWork } = _req.body
    try {
      const typesOfWork = await Promise.all([
        await selectedTypesOfWork.map(async (id: string) => {
          await TypesOfWorkRepos.update(id, {
            active: false,
          })
        }),
        await TypesOfWorkRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedTypesOfWork } },
        }),
      ])
      res.status(200).json(typesOfWork[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  fullDeleteTypesOfWork = async (_req: Request, res: Response) => {
    const { selectedTypesOfWork } = _req.body
    try {
      const typesOfWork = await Promise.all([
        await selectedTypesOfWork.map(async (id: string) => {
          await TypesOfWorkRepos.destroy({
            where: { id },
          })
        }),
        await TypesOfWorkRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedTypesOfWork } },
        }),
      ])
      res.status(200).json(typesOfWork[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  pullTypesOfWorkFromArchive = async (_req: Request, res: Response) => {
    const { selectedTypesOfWork } = _req.body
    try {
      await TypesOfWorkRepos.update(selectedTypesOfWork, {
        active: true,
      })
      const typesOfWork = await TypesOfWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesOfWork)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeTypesOfWork = async (_req: Request, res: Response) => {
    const { typeOfWork, id } = _req.body
    try {
      await TypesOfWorkRepos.update(id, { typeOfWork })
      const typesOfWork = await TypesOfWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesOfWork)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  newINC = async (_req: Request, res: Response) => {
    try {
      await IncidentRepos.create({ ..._req.body, active: true })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to set new incident statuses', err],
      })
    }
  }
  getAllINC = (_req: Request, res: Response) => {
    IncidentRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getINC = (_req: Request, res: Response) => {
    IncidentRepos.findAll({
      where: { active: true },
    })
      .then(incs => {
        res.status(200).json(incs)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteINC = async (_req: Request, res: Response) => {
    const { selectedINCs } = _req.body
    try {
      const incs = await Promise.all([
        await selectedINCs.map(async (id: string) => {
          await IncidentRepos.update(id, {
            active: false,
          })
        }),
        await IncidentRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedINCs } },
        }),
      ])
      res.status(200).json(incs[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  fullDeleteINC = async (_req: Request, res: Response) => {
    const { selectedINCs } = _req.body
    try {
      const incs = await Promise.all([
        await selectedINCs.map(async (id: string) => {
          await IncidentRepos.destroy({
            where: { id },
          })
        }),
        await IncidentRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedINCs } },
        }),
      ])
      res.status(200).json(incs[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  pullINCFromArchive = async (_req: Request, res: Response) => {
    const { selectedINCs } = _req.body
    try {
      await IncidentRepos.update(selectedINCs, {
        active: true,
      })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeINC = async (_req: Request, res: Response) => {
    const { inc, id } = _req.body
    try {
      await IncidentRepos.update(id, { inc })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
