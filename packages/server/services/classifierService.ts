import {
  ClassifierEquipmentRepos,
  ClassifierModels,
  ClassifierModelsRepos,
  TypicalMalfunctions,
  TypicalMalfunctionsRepos,
} from '../db'
import type { Request, Response } from 'express'
const { Op } = require('sequelize')

const includesEquipment = [
  {
    model: ClassifierModels,
    attributes: ['id', 'model', 'id_equipment', 'active'],
    include: [
      {
        model: TypicalMalfunctions,
        attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
      },
    ],
  },
  {
    model: TypicalMalfunctions,
    attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
  },
]

const includesModel = [
  {
    model: TypicalMalfunctions,
    attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
  },
]

export class classifierService {
  newClassifierEquipment = async (_req: Request, res: Response) => {
    try {
      await ClassifierEquipmentRepos.create({ ..._req.body, active: true })
      const classifierEquipments = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
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
    ClassifierEquipmentRepos.findAll({ include: includesEquipment })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getClassifierEquipments = (_req: Request, res: Response) => {
    ClassifierEquipmentRepos.findAll({
      where: { active: true },
      include: includesEquipment,
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
        await selectedClassifierEquipments.map(async (id: string) => {
          await ClassifierEquipmentRepos.update(id, {
            active: false,
          })
        }),
        await ClassifierEquipmentRepos.findAll({
          where: {
            active: true,
            id: { [Op.not]: selectedClassifierEquipments },
            include: includesEquipment,
          },
        }),
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
        await selectedClassifierEquipments.map(async (id: string) => {
          await ClassifierEquipmentRepos.destroy({
            where: { id },
          })
        }),
        await ClassifierEquipmentRepos.findAll({
          where: {
            active: true,
            id: { [Op.not]: selectedClassifierEquipments },
            include: includesEquipment,
          },
        }),
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
    try {
      await ClassifierEquipmentRepos.update(selectedClassifierEquipments, {
        active: true,
      })
      const classifierEquipments = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
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
        include: includesEquipment,
      })
      res.status(200).json(classifierEquipments)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  newClassifierModel = async (_req: Request, res: Response) => {
    const { id_equipment, model } = _req.body
    try {
      await ClassifierModelsRepos.create({
        id_equipment,
        model,
        active: true,
      })
      const classifierModels = await ClassifierModelsRepos.findAll({
        where: { active: true },
        include: includesModel,
      })
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
    ClassifierModelsRepos.findAll({ include: includesModel })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getClassifierModels = (_req: Request, res: Response) => {
    ClassifierModelsRepos.findAll({
      where: { active: true },
      include: includesModel,
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
      include: includesModel,
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
        await selectedClassifierModels.map(async (id: string) => {
          await ClassifierModelsRepos.update(id, {
            active: false,
          })
        }),
        await ClassifierModelsRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedClassifierModels } },
          include: includesModel,
        }),
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
        await selectedСlassifierModels.map(async (id: string) => {
          await ClassifierModelsRepos.destroy({
            where: { id },
          })
        }),
        await ClassifierModelsRepos.findAll({
          where: { active: true, id: { [Op.not]: selectedСlassifierModels } },
          include: includesModel,
        }),
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
        include: includesModel,
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
        include: includesModel,
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
        await selectedtypicalMalfunctions.map(async (id: string) => {
          await TypicalMalfunctionsRepos.update(id, {
            active: false,
          })
        }),
        await TypicalMalfunctionsRepos.findAll({
          where: {
            active: true,
            id: { [Op.not]: selectedtypicalMalfunctions },
          },
        }),
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
        await selectedtypicalMalfunctions.map(async (id: string) => {
          await TypicalMalfunctionsRepos.destroy({
            where: { id },
          })
        }),
        await TypicalMalfunctionsRepos.findAll({
          where: {
            active: true,
            id: { [Op.not]: selectedtypicalMalfunctions },
          },
        }),
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
