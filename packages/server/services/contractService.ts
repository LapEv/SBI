import { ContractsRepos } from '../db'
import type { Request, Response } from 'express'
const { Op } = require('sequelize')
// interface ShortTypicalMalfunctions {
//   models: string[]
//   id: string
// }
export class contractService {
  newContract = async (_req: Request, res: Response) => {
    console.log('body = ', _req.body)
    try {
      await ContractsRepos.create({ ..._req.body, active: true })
      const contracts = await ContractsRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(contracts)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to set new contract', err],
      })
    }
  }

  getAllContracts = (_req: Request, res: Response) => {
    ContractsRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getContracts = (_req: Request, res: Response) => {
    ContractsRepos.findAll({
      where: { active: true },
    })
      .then(contracts => {
        res.status(200).json(contracts)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteContract = async (_req: Request, res: Response) => {
    const { selectedContracts } = _req.body
    try {
      const contracts = await Promise.all([
        await selectedContracts.map(async (id: string) => {
          await ContractsRepos.update(id, {
            active: false,
          })
        }),
        await ContractsRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedContracts } },
        }),
      ])
      res.status(200).json(contracts[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  fullDeleteContract = async (_req: Request, res: Response) => {
    const { selectedContracts } = _req.body
    try {
      const contracts = await Promise.all([
        await selectedContracts.map(async (id: string) => {
          await ContractsRepos.destroy({
            where: { id },
          })
        }),
        await ContractsRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedContracts } },
        }),
      ])
      res.status(200).json(contracts[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  pullContractFromArchive = async (_req: Request, res: Response) => {
    const { selectedContracts } = _req.body
    try {
      await ContractsRepos.update(selectedContracts, {
        active: true,
      })
      const contracts = await ContractsRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(contracts)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeContract = async (_req: Request, res: Response) => {
    const { contract, number, date, sla, equipment, objects, id } = _req.body
    try {
      await ContractsRepos.update(id, {
        contract,
        number,
        date,
        sla,
        equipment,
        objects,
      })
      const contracts = await ContractsRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(contracts)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
