import {
  ClassifierEquipment,
  Clients,
  ContractsRepos,
  Objects,
  SLA,
  ThroughContractsEquipmentsRepos,
  ThroughContractsObjectsRepos,
  ThroughContractsSLARepos,
} from '../db'
import type { Request, Response } from 'express'
const { Op } = require('sequelize')

const includes = [
  {
    model: SLA,
    through: {
      attributes: [],
    },
  },
  {
    model: Objects,
    through: {
      attributes: [],
    },
  },
  {
    model: ClassifierEquipment,
    through: {
      attributes: [],
    },
  },
  {
    model: Clients,
  },
]
export class contractService {
  newContract = async (_req: Request, res: Response) => {
    const { sla, equipment, objects, ...data } = _req.body
    try {
      const new_contract = await ContractsRepos.create({
        ...data,
        active: true,
      })
      const newThroughContractSla = sla.map((item: string) => {
        return {
          id_contract: new_contract.id,
          id_sla: item,
        }
      })
      await ThroughContractsSLARepos.bulkCreate(newThroughContractSla)
      const newThroughContractEquipment = equipment.map((item: string) => {
        return {
          id_contract: new_contract.id,
          id_equipment: item,
        }
      })
      await ThroughContractsEquipmentsRepos.bulkCreate(
        newThroughContractEquipment
      )
      const newThroughContractObject = objects.map((item: string) => {
        return {
          id_contract: new_contract.id,
          id_object: item,
        }
      })
      await ThroughContractsObjectsRepos.bulkCreate(newThroughContractObject)

      const contracts = await ContractsRepos.findAll({
        where: { active: true },
        include: includes,
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
        include: includes,
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
    ContractsRepos.findAll({ include: includes })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getContracts = (_req: Request, res: Response) => {
    ContractsRepos.findAll({
      where: { active: true },
      include: includes,
    })
      .then(contracts => {
        res.status(200).json(contracts)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  getContractsByClientID = (_req: Request, res: Response) => {
    const { id_client } = _req.body
    ContractsRepos.findAll({
      where: { active: true, id_client },
      include: includes,
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
          include: includes,
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
          include: includes,
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
        include: includes,
      })
      res.status(200).json(contracts)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeContract = async (_req: Request, res: Response) => {
    // const { number, date, sla, equipment, objects, id } = _req.body
    const { number, date, id } = _req.body
    try {
      await ContractsRepos.update(id, { number, date })
      const contracts = await ContractsRepos.findAll({
        where: { active: true },
        include: includes,
      })
      // const newThroughContractSla = sla.map((item: string) => {
      //   return {
      //     id_contract: new_contract.id,
      //     id_sla: item,
      //   }
      // })
      // await ThroughContractsSLARepos.bulkCreate(newThroughContractSla)
      const all = await ThroughContractsSLARepos.findAll({})
      console.log('all = ', all)
      res.status(200).json({ contracts, all })
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
