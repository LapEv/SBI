import {
  ClassifierEquipmentRepos,
  ClassifierModelsRepos,
  TypicalMalfunctionsRepos,
} from '../db'
import type { Request, Response } from 'express'

export class classifierService {
  newClassifierEquipment = async (_req: Request, res: Response) => {
    try {
      await ClassifierEquipmentRepos.create({ ..._req.body, active: true })
      const classifierEquipments = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(classifierEquipments)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res
        .status(500)
        .json({ error: ['db error: unable to set new address', err] })
    }
  }

  getAllClassifierEquipments = (_req: Request, res: Response) => {
    ClassifierEquipmentRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getClassifierEquipments = (_req: Request, res: Response) => {
    ClassifierEquipmentRepos.findAll({
      where: { active: true },
    })
      .then(classifierEquipments => {
        res.status(200).json(classifierEquipments)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteClassifierEquipment = async (_req: Request, res: Response) => {
    const { selectedclassifierEquipments } = _req.body
    try {
      const classifierEquipments = await Promise.all([
        await selectedclassifierEquipments.map(async (value: string) => {
          await ClassifierEquipmentRepos.update(value, {
            active: false,
          })
        }),
        await ClassifierEquipmentRepos.findAll({ where: { active: true } }),
      ])
      res.status(200).json(classifierEquipments[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  fullDeleteClassifierEquipment = async (_req: Request, res: Response) => {
    const { selectedclassifierEquipments } = _req.body
    try {
      const classifierEquipments = await Promise.all([
        await selectedclassifierEquipments.map(async (value: string) => {
          await ClassifierEquipmentRepos.destroy({
            where: { id: value },
          })
        }),
        await ClassifierEquipmentRepos.findAll({ where: { active: true } }),
      ])
      res.status(200).json(classifierEquipments[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  pullClassifierEquipmentFromArchive = async (_req: Request, res: Response) => {
    const { selectedclassifierEquipments } = _req.body
    try {
      await ClassifierEquipmentRepos.update(selectedclassifierEquipments, {
        active: true,
      })
      const classifierEquipments = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(classifierEquipments)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeClassifierEquipment = async (_req: Request, res: Response) => {
    const { classifierEquipment, id } = _req.body
    try {
      await ClassifierEquipmentRepos.update(id, classifierEquipment)
      const classifierEquipments = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(classifierEquipments)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  newClassifierModel = async (_req: Request, res: Response) => {
    try {
      await ClassifierModelsRepos.create({ ..._req.body, active: true })
      const classifierModels = await ClassifierModelsRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(classifierModels)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res
        .status(500)
        .json({ error: ['db error: unable to set new address', err] })
    }
  }

  getAllClassifierModels = (_req: Request, res: Response) => {
    ClassifierModelsRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getClassifierModels = (_req: Request, res: Response) => {
    ClassifierModelsRepos.findAll({
      where: { active: true },
    })
      .then(classifierModels => {
        res.status(200).json(classifierModels)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteClassifierModel = async (_req: Request, res: Response) => {
    const { selectedclassifierModels } = _req.body
    try {
      const classifierModels = await Promise.all([
        await selectedclassifierModels.map(async (value: string) => {
          await ClassifierModelsRepos.update(value, {
            active: false,
          })
        }),
        await ClassifierEquipmentRepos.findAll({ where: { active: true } }),
      ])
      res.status(200).json(classifierModels[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  fullDeleteClassifierModel = async (_req: Request, res: Response) => {
    const { selectedclassifierModels } = _req.body
    try {
      const classifierModels = await Promise.all([
        await selectedclassifierModels.map(async (value: string) => {
          await ClassifierModelsRepos.destroy({
            where: { id: value },
          })
        }),
        await ClassifierModelsRepos.findAll({ where: { active: true } }),
      ])
      res.status(200).json(classifierModels[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  pullClassifierModelFromArchive = async (_req: Request, res: Response) => {
    const { selectedclassifierModels } = _req.body
    try {
      await ClassifierModelsRepos.update(selectedclassifierModels, {
        active: true,
      })
      const classifierModels = await ClassifierModelsRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(classifierModels)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeClassifierModel = async (_req: Request, res: Response) => {
    const { classifierModel, id } = _req.body
    try {
      await ClassifierEquipmentRepos.update(id, classifierModel)
      const classifierModels = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(classifierModels)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  newTypicalMalfunction = async (_req: Request, res: Response) => {
    try {
      await TypicalMalfunctionsRepos.create({ ..._req.body, active: true })
      const typicalMalfunctions = await TypicalMalfunctionsRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typicalMalfunctions)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res
        .status(500)
        .json({ error: ['db error: unable to set new address', err] })
    }
  }

  getAllTypicalMalfunctions = (_req: Request, res: Response) => {
    TypicalMalfunctionsRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getTypicalMalfunctions = (_req: Request, res: Response) => {
    TypicalMalfunctionsRepos.findAll({
      where: { active: true },
    })
      .then(typicalMalfunctions => {
        res.status(200).json(typicalMalfunctions)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteTypicalMalfunction = async (_req: Request, res: Response) => {
    const { selectedtypicalMalfunctions } = _req.body
    try {
      const typicalMalfunctions = await Promise.all([
        await selectedtypicalMalfunctions.map(async (value: string) => {
          await TypicalMalfunctionsRepos.update(value, {
            active: false,
          })
        }),
        await TypicalMalfunctionsRepos.findAll({ where: { active: true } }),
      ])
      res.status(200).json(typicalMalfunctions[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  fullDeleteTypicalMalfunction = async (_req: Request, res: Response) => {
    const { selectedtypicalMalfunctions } = _req.body
    try {
      const typicalMalfunctions = await Promise.all([
        await selectedtypicalMalfunctions.map(async (value: string) => {
          await TypicalMalfunctionsRepos.destroy({
            where: { id: value },
          })
        }),
        await TypicalMalfunctionsRepos.findAll({ where: { active: true } }),
      ])
      res.status(200).json(typicalMalfunctions[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  pullTypicalMalfunctionFromArchive = async (_req: Request, res: Response) => {
    const { selectedtypicalMalfunctions } = _req.body
    try {
      await TypicalMalfunctionsRepos.update(selectedtypicalMalfunctions, {
        active: true,
      })
      const typicalMalfunctions = await TypicalMalfunctionsRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typicalMalfunctions)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeTypicalMalfunction = async (_req: Request, res: Response) => {
    const { typicalMalfunction, id } = _req.body
    try {
      await TypicalMalfunctionsRepos.update(id, typicalMalfunction)
      const typicalMalfunctions = await TypicalMalfunctionsRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typicalMalfunctions)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
