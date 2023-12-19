import { SLARepos, OLARepos, TypesOfWork } from '../db'
import type { Request, Response } from 'express'
const { Op } = require('sequelize')

const includes = [
  { model: TypesOfWork, attributes: ['id', 'typeSLA', 'active'] },
]
export class slaService {
  newSLA = async (_req: Request, res: Response) => {
    try {
      await SLARepos.create({ ..._req.body, active: true })
      const sla = await SLARepos.findAll({
        where: { active: true },
        include: includes,
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
    SLARepos.findAll({
      include: includes,
    })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getSLA = (_req: Request, res: Response) => {
    SLARepos.findAll({
      where: { active: true },
      include: includes,
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
        await selectedSLA.map(async (id: string) => {
          await SLARepos.update(id, {
            active: false,
          })
        }),
        await SLARepos.findAll({
          where: { active: true, id: { [Op.not]: selectedSLA } },
          include: includes,
        }),
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
        await selectedSLA.map(async (id: string) => {
          await SLARepos.destroy({
            where: { id },
          })
        }),
        await SLARepos.findAll({
          where: { active: true, id: { [Op.not]: selectedSLA } },
          include: includes,
        }),
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
        include: includes,
      })
      res.status(200).json(sla)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeSLA = async (_req: Request, res: Response) => {
    const { sla, id, time, timeStart, timeEnd, id_typeSLA } = _req.body
    try {
      await SLARepos.update(id, { sla, time, timeStart, timeEnd, id_typeSLA })
      const slas = await SLARepos.findAll({
        where: { active: true },
        include: includes,
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
        include: includes,
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
    OLARepos.findAll({ include: includes })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getOLA = (_req: Request, res: Response) => {
    OLARepos.findAll({
      where: { active: true },
      include: includes,
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
        await selectedOLA.map(async (id: string) => {
          await OLARepos.update(id, {
            active: false,
          })
        }),
        await OLARepos.findAll({
          where: { active: true, id: { [Op.not]: selectedOLA } },
          include: includes,
        }),
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
        await selectedOLA.map(async (id: string) => {
          await OLARepos.destroy({
            where: { id },
          })
        }),
        await OLARepos.findAll({
          where: { active: true, id: { [Op.not]: selectedOLA } },
          include: includes,
        }),
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
        include: includes,
      })
      res.status(200).json(ola)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeOLA = async (_req: Request, res: Response) => {
    const { ola, id, time, timeStart, timeEnd, id_typeSLA } = _req.body
    try {
      await OLARepos.update(id, { ola, time, timeStart, timeEnd, id_typeSLA })
      const olas = await OLARepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(olas)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  // newTypesSLA = async (_req: Request, res: Response) => {
  //   try {
  //     await TypesSLARepos.create({ ..._req.body, active: true })
  //     const typesSLA = await TypesSLARepos.findAll({
  //       where: { active: true },
  //     })
  //     res.status(200).json(typesSLA)
  //     /* eslint-disable @typescript-eslint/no-explicit-any */
  //   } catch (err: any) {
  //     /* eslint-enable @typescript-eslint/no-explicit-any */
  //     res.status(500).json({
  //       error: ['db error: unable to set new ola', err],
  //     })
  //   }
  // }
  // getAllTypesSLA = (_req: Request, res: Response) => {
  //   TypesSLARepos.findAll({})
  //     .then(item => res.status(200).json(item))
  //     .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  // }
  // getTypesSLA = (_req: Request, res: Response) => {
  //   TypesSLARepos.findAll({
  //     where: { active: true },
  //   })
  //     .then(typesSLA => {
  //       res.status(200).json(typesSLA)
  //     })
  //     .catch(err => res.status(500).json({ error: ['db error', err] }))
  // }
  // deleteTypesSLA = async (_req: Request, res: Response) => {
  //   const { selectedtypesSLA } = _req.body
  //   try {
  //     const typesSLA = await Promise.all([
  //       await selectedtypesSLA.map(async (id: string) => {
  //         await TypesSLARepos.update(id, {
  //           active: false,
  //         })
  //       }),
  //       await TypesSLARepos.findAll({
  //         where: { active: true, id: { [Op.not]: selectedtypesSLA } },
  //       }),
  //     ])
  //     res.status(200).json(typesSLA[1])
  //     /* eslint-disable @typescript-eslint/no-explicit-any */
  //   } catch (err: any) {
  //     /* eslint-enable @typescript-eslint/no-explicit-any */
  //     res.status(500).json({ error: ['db error', err] })
  //   }
  // }
  // fullDeleteTypesSLA = async (_req: Request, res: Response) => {
  //   const { selectedtypesSLA } = _req.body
  //   try {
  //     const typesSLA = await Promise.all([
  //       await selectedtypesSLA.map(async (id: string) => {
  //         await TypesSLARepos.destroy({
  //           where: { id },
  //         })
  //       }),
  //       await TypesSLARepos.findAll({
  //         where: { active: true, id: { [Op.not]: selectedtypesSLA } },
  //       }),
  //     ])
  //     res.status(200).json(typesSLA[1])
  //     /* eslint-disable @typescript-eslint/no-explicit-any */
  //   } catch (err: any) {
  //     /* eslint-enable @typescript-eslint/no-explicit-any */
  //     res.status(500).json({ error: ['db error', err] })
  //   }
  // }
  // pullTypesSLAFromArchive = async (_req: Request, res: Response) => {
  //   const { selectedtypesSLA } = _req.body
  //   try {
  //     await TypesSLARepos.update(selectedtypesSLA, {
  //       active: true,
  //     })
  //     const typesSLA = await TypesSLARepos.findAll({
  //       where: { active: true },
  //     })
  //     res.status(200).json(typesSLA)
  //     /* eslint-disable @typescript-eslint/no-explicit-any */
  //   } catch (err: any) {
  //     /* eslint-enable @typescript-eslint/no-explicit-any */
  //     res.status(500).json({ error: ['db error', err] })
  //   }
  // }
  // changeTypesSLA = async (_req: Request, res: Response) => {
  //   const { typeSLA, id } = _req.body
  //   try {
  //     await TypesSLARepos.update(id, { typeSLA })
  //     const typesSLAs = await TypesSLARepos.findAll({
  //       where: { active: true },
  //     })
  //     res.status(200).json(typesSLAs)
  //     /* eslint-disable @typescript-eslint/no-explicit-any */
  //   } catch (err: any) {
  //     /* eslint-enable @typescript-eslint/no-explicit-any */
  //     res.status(500).json({ error: ['db error', err] })
  //   }
  // }
}
