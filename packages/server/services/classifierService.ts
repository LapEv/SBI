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
      res.status(500).json({
        error: ['db error: unable to set new classifier equipment', err],
      })
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
    const { selectedClassifierEquipments } = _req.body
    try {
      const classifierEquipments = await Promise.all([
        await selectedClassifierEquipments.map(async (value: string) => {
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
    const { selectedClassifierEquipments } = _req.body
    try {
      const classifierEquipments = await Promise.all([
        await selectedClassifierEquipments.map(async (value: string) => {
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
    const { selectedClassifierEquipments } = _req.body
    console.log('selectedClassifierEquipments = ', selectedClassifierEquipments)
    try {
      await ClassifierEquipmentRepos.update(selectedClassifierEquipments, {
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
    const { equipment, id } = _req.body
    try {
      await ClassifierEquipmentRepos.update(id, { equipment })
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
    const { id_equipment, model, selectedTypicalMalfunctions } = _req.body

    try {
      const newModel = await ClassifierModelsRepos.create({
        id_equipment,
        model,
        active: true,
      })
      const classifierModels = await ClassifierModelsRepos.findAll({
        where: { active: true },
      })

      await selectedTypicalMalfunctions.map(async (value: string) => {
        const type = await TypicalMalfunctionsRepos.findAll({
          where: {
            id: value,
          },
        })
        type[0].models.push(newModel.id)
        await TypicalMalfunctionsRepos.update(value, {
          models: type[0].models,
        })
      }),
        res.status(200).json(classifierModels)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res
        .status(500)
        .json({ error: ['db error: unable to set new classifier model', err] })
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

  getClassifierModelsById = (_req: Request, res: Response) => {
    const { id_equipment } = _req.body
    ClassifierModelsRepos.findAll({
      where: { active: true, id_equipment },
    })
      .then(classifierModels => {
        res.status(200).json(classifierModels)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteClassifierModel = async (_req: Request, res: Response) => {
    const { selectedClassifierModels } = _req.body
    try {
      const classifierModels = await Promise.all([
        await selectedClassifierModels.map(async (value: string) => {
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
    const { selectedСlassifierModels } = _req.body
    try {
      const classifierModels = await Promise.all([
        await selectedСlassifierModels.map(async (value: string) => {
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
    const { selectedClassifierModels } = _req.body
    try {
      await ClassifierModelsRepos.update(selectedClassifierModels, {
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
    const { model, id, id_equipment } = _req.body
    try {
      await ClassifierModelsRepos.update(id, { model })
      const classifierModels = await ClassifierModelsRepos.findAll({
        where: { active: true, id_equipment },
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
      res.status(500).json({
        error: ['db error: unable to set new typical malfunction', err],
      })
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

  getTypicalMalfunctionsById = (_req: Request, res: Response) => {
    const { id_equipment } = _req.body
    TypicalMalfunctionsRepos.findAll({
      where: { active: true, id_equipment },
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
    const { selectedTypicalMalfunctions } = _req.body
    try {
      await TypicalMalfunctionsRepos.update(selectedTypicalMalfunctions, {
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
    console.log('typicalMalfunction = ', typicalMalfunction)
    console.log('id = ', id)
    try {
      await TypicalMalfunctionsRepos.update(id, { typicalMalfunction })
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
