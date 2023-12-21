import { Order } from 'sequelize'
import {
  // ClassifierEquipment,
  ClassifierEquipmentRepos,
  ClassifierModels,
  ClassifierModelsRepos,
  ThroughModelTypMalfunctionsRepos,
  TypicalMalfunctions,
  TypicalMalfunctionsRepos,
} from '../db'
import type { Request, Response } from 'express'
const { Op } = require('sequelize')

const includesEquipment = [
  {
    model: ClassifierModels,
    attributes: ['id', 'model', 'id_equipment', 'active'],
    where: { active: true },
    order: [
      ['id', 'ASC'],
      ['model', 'DESC'],
    ] as Order,
    include: [
      {
        model: TypicalMalfunctions,
        attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
        where: { active: true },
        order: [
          ['id', 'ASC'],
          ['typicalMalfunction', 'DESC'],
        ] as Order,
      },
    ],
  },
  {
    model: TypicalMalfunctions,
    attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
    where: { active: true },
    order: [
      ['id', 'ASC'],
      ['typicalMalfunction', 'DESC'],
    ] as Order,
  },
]

const includesModel = [
  {
    model: TypicalMalfunctions,
    attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
    where: { active: true },
  },
]

const includesAllEquipment = [
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

const includesAllModel = [
  {
    model: TypicalMalfunctions,
    attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
  },
]

const order = [
  ['id', 'ASC'],
  ['equipment', 'DESC'],
] as Order

export class classifierService {
  newClassifierEquipment = async (_req: Request, res: Response) => {
    try {
      await ClassifierEquipmentRepos.create({ ..._req.body, active: true })
      const classifierEquipments = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
        order: [['id', 'DESC']],
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
    ClassifierEquipmentRepos.findAll({
      include: includesAllEquipment,
      order: [['id', 'DESC']],
    })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getClassifierEquipments = async (_req: Request, res: Response) => {
    ClassifierEquipmentRepos.findAll({
      where: { active: true },
      include: includesEquipment,
      order,
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
            order: [['id', 'DESC']],
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
            order: [['id', 'DESC']],
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
        order: [['id', 'DESC']],
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
        order: [['id', 'DESC']],
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
        order: [['id', 'DESC']],
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
    ClassifierModelsRepos.findAll({
      include: includesAllModel,
      order: [['id', 'DESC']],
    })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getClassifierModels = (_req: Request, res: Response) => {
    ClassifierModelsRepos.findAll({
      where: { active: true },
      include: includesModel,
      order: [['id', 'DESC']],
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
      order: [['id', 'DESC']],
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
          order: [['id', 'DESC']],
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
          order: [['id', 'DESC']],
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
        order: [['id', 'DESC']],
      })
      res.status(200).json(classifierModels)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeClassifierModel = async (_req: Request, res: Response) => {
    const { model, id, selectedTypicalMalfunction } = _req.body
    try {
      await ClassifierModelsRepos.update(id, { model })

      if (selectedTypicalMalfunction && selectedTypicalMalfunction.length) {
        await ThroughModelTypMalfunctionsRepos.deleteByCustomId({
          id_model: id,
        })
        const newThroughModelTypicalMalfunction =
          selectedTypicalMalfunction.map((item: string) => {
            return {
              id_model: id,
              id_typicalMalfunction: item,
            }
          })
        await ThroughModelTypMalfunctionsRepos.bulkCreate(
          newThroughModelTypicalMalfunction
        )
      }
      const classifierEquipment = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
        order,
      })
      res.status(200).json(classifierEquipment)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  newTypicalMalfunction = async (_req: Request, res: Response) => {
    const { selectedModels, ...data } = _req.body
    try {
      const typMalfunction = await TypicalMalfunctionsRepos.create({
        ...data,
        active: true,
      })

      const newThroughModelTypMalfunctions = selectedModels.map(
        (item: string) => {
          return {
            id_typicalMalfunction: typMalfunction.id,
            id_model: item,
          }
        }
      )
      await ThroughModelTypMalfunctionsRepos.bulkCreate(
        newThroughModelTypMalfunctions
      )
      const typicalMalfunctions = await TypicalMalfunctionsRepos.findAll({
        where: { active: true },
        order: [['id', 'DESC']],
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
    TypicalMalfunctionsRepos.findAll({ order: [['id', 'DESC']] })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getTypicalMalfunctions = (_req: Request, res: Response) => {
    TypicalMalfunctionsRepos.findAll({
      where: { active: true },
      order: [['id', 'DESC']],
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
      order: [['id', 'DESC']],
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
            order: [['id', 'DESC']],
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
            order: [['id', 'DESC']],
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
        order: [['id', 'DESC']],
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
        order: [['id', 'DESC']],
      })
      res.status(200).json(typicalMalfunctions)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
