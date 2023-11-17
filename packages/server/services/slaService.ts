import { SLARepos, OLARepos } from '../db'
import type { Request, Response } from 'express'

// interface ShortTypicalMalfunctions {
//   models: string[]
//   id: string
// }
export class slaService {
  newSLA = async (_req: Request, res: Response) => {
    try {
      await SLARepos.create({ ..._req.body, active: true })
      const sla = await SLARepos.findAll({
        where: { active: true },
      })
      res.status(200).json(sla)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to set new sla', err],
      })
    }
  }

  getAllSLA = (_req: Request, res: Response) => {
    SLARepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getSLA = (_req: Request, res: Response) => {
    SLARepos.findAll({
      where: { active: true },
    })
      .then(sla => {
        res.status(200).json(sla)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteSLA = async (_req: Request, res: Response) => {
    const { selectedSLA } = _req.body
    try {
      const sla = await Promise.all([
        await selectedSLA.map(async (value: string) => {
          await SLARepos.update(value, {
            active: false,
          })
        }),
        await SLARepos.findAll({ where: { active: true } }),
      ])
      res.status(200).json(sla[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  fullDeleteSLA = async (_req: Request, res: Response) => {
    const { selectedSLA } = _req.body
    try {
      const sla = await Promise.all([
        await selectedSLA.map(async (value: string) => {
          await SLARepos.destroy({
            where: { id: value },
          })
        }),
        await SLARepos.findAll({ where: { active: true } }),
      ])
      res.status(200).json(sla[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  pullSLAFromArchive = async (_req: Request, res: Response) => {
    const { selectedSLA } = _req.body
    try {
      await SLARepos.update(selectedSLA, {
        active: true,
      })
      const sla = await SLARepos.findAll({
        where: { active: true },
      })
      res.status(200).json(sla)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeSLA = async (_req: Request, res: Response) => {
    const { sla, id } = _req.body
    try {
      await SLARepos.update(id, { sla })
      const slas = await SLARepos.findAll({
        where: { active: true },
      })
      res.status(200).json(slas)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  newOLA = async (_req: Request, res: Response) => {
    try {
      await OLARepos.create({ ..._req.body, active: true })
      const ola = await OLARepos.findAll({
        where: { active: true },
      })
      res.status(200).json(ola)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to set new ola', err],
      })
    }
  }

  getAllOLA = (_req: Request, res: Response) => {
    OLARepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getOLA = (_req: Request, res: Response) => {
    OLARepos.findAll({
      where: { active: true },
    })
      .then(ola => {
        res.status(200).json(ola)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteOLA = async (_req: Request, res: Response) => {
    const { selectedOLA } = _req.body
    try {
      const ola = await Promise.all([
        await selectedOLA.map(async (value: string) => {
          await OLARepos.update(value, {
            active: false,
          })
        }),
        await OLARepos.findAll({ where: { active: true } }),
      ])
      res.status(200).json(ola[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  fullDeleteOLA = async (_req: Request, res: Response) => {
    const { selectedOLA } = _req.body
    try {
      const ola = await Promise.all([
        await selectedOLA.map(async (value: string) => {
          await OLARepos.destroy({
            where: { id: value },
          })
        }),
        await OLARepos.findAll({ where: { active: true } }),
      ])
      res.status(200).json(ola[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  pullOLAFromArchive = async (_req: Request, res: Response) => {
    const { selectedOLA } = _req.body
    try {
      await OLARepos.update(selectedOLA, {
        active: true,
      })
      const ola = await OLARepos.findAll({
        where: { active: true },
      })
      res.status(200).json(ola)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeOLA = async (_req: Request, res: Response) => {
    const { ola, id } = _req.body
    try {
      await OLARepos.update(id, { ola })
      const olas = await OLARepos.findAll({
        where: { active: true },
      })
      res.status(200).json(olas)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
