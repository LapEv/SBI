import { IncidentRepos, IncidentStatusesRepos, TypesOfWorkRepos } from './../db'
import type { Request, Response } from 'express'

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
      await IncidentStatusesRepos.update(selectedINCStatuses, {
        active: false,
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
  fullDeleteIncidentStatuses = async (_req: Request, res: Response) => {
    const { selectedINCStatuses } = _req.body
    try {
      await IncidentStatusesRepos.destroy({
        where: { id: selectedINCStatuses },
      })
      const incStatuses = await IncidentStatusesRepos.findAll({})
      res.status(200).json(incStatuses)
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
      await TypesOfWorkRepos.update(selectedTypesOfWork, {
        active: false,
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
  fullDeleteTypesOfWork = async (_req: Request, res: Response) => {
    const { selectedTypesOfWork } = _req.body
    try {
      await TypesOfWorkRepos.destroy({
        where: { id: selectedTypesOfWork },
      })
      const typesOfWork = await TypesOfWorkRepos.findAll({})
      res.status(200).json(typesOfWork)
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
      await IncidentRepos.update(selectedINCs, {
        active: false,
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
  fullDeleteINC = async (_req: Request, res: Response) => {
    const { selectedINCs } = _req.body
    try {
      await IncidentRepos.destroy({
        where: { id: selectedINCs },
      })
      const incs = await IncidentRepos.findAll({})
      res.status(200).json(incs)
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
