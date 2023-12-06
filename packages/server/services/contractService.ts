import {
  ClassifierEquipment,
  ContractsRepos,
  Objects,
  SLA,
  ThroughContractsSLARepos,
} from '../db'
import type { Request, Response } from 'express'
const { Op } = require('sequelize')
// interface ShortTypicalMalfunctions {
//   models: string[]
//   id: string
// }
export class contractService {
  newContract = async (_req: Request, res: Response) => {
    const { sla } = _req.body
    console.log('sla = ', sla)
    try {
      const new_contract = await ContractsRepos.create({
        ..._req.body,
        active: true,
      })
      console.log('new_contract = ', new_contract)
      const newThroughContractSla = sla.map((item: string) => {
        return {
          // ContractId: new_contract.id,
          // SLAId: item,
          id_contract: new_contract.id,
          id_sla: item,
        }
      })
      const newThrough = await ThroughContractsSLARepos.bulkCreate(
        newThroughContractSla
      )
      console.log('newThrough = ', newThrough)
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

  newContractName = async (_req: Request, res: Response) => {
    const { contract, id } = _req.body
    try {
      await ContractsRepos.update(id, {
        contract,
      })
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
    console.log('getAllContracts')
    ContractsRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getContracts = (_req: Request, res: Response) => {
    console.log('getContracts')
    ContractsRepos.findAll({
      where: { active: true },
      include: [
        {
          model: SLA,
          where: {
            SLAid: 'fd3c8f5b-627a-405d-88f9-6adb25ed62d6',
          },
        },
        {
          model: ClassifierEquipment,
          attributes: ['equipment'],
        },
        {
          model: Objects,
          attributes: ['object'],
        },
      ],
    })
      .then(contracts => {
        res.status(200).json(contracts)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  getContractsByClientID = (_req: Request, res: Response) => {
    console.log('getContractsByClientID')
    // const { id_client } = _req.body
    ContractsRepos.findAll({
      // where: { active: true, id_client },
      include: [
        { all: true, nested: true },
        // {
        //   model: SLA,
        //   where: {
        //     id: 'fd3c8f5b-627a-405d-88f9-6adb25ed62d6',
        //   },
        // },
        // {
        //   model: ClassifierEquipment,
        //   through: {
        //     attributes: [],
        //   },
        // },
        // {
        //   model: Objects,
        //   through: {
        //     attributes: [],
        //   },
        // },
      ],
    })
      .then(contracts => {
        console.log('contracts = ', contracts)
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
