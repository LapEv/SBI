import type { Request, Response } from 'express'
import { DivisionRepos } from '../db'

export class divisionService {
  newDivision = async (_req: Request, res: Response) => {
    const { division, divisionName } = _req.body
    try {
      await DivisionRepos.create({
        division,
        divisionName,
        active: true,
      })
      const divisions = await DivisionRepos.findAll({ where: { active: true } })
      res.status(200).json(divisions)
    } catch (err: any) {
      res.status(500).json({ error: ['db error: unable to set division', err] })
    }
  }

  getDivisions = (_req: Request, res: Response) => {
    DivisionRepos.findAll({ where: { active: true } })
      .then(divisions => res.status(200).json(divisions))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getAllDivisions = (_req: Request, res: Response) => {
    DivisionRepos.findAll({})
      .then(divisions => res.status(200).json(divisions))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  deleteDivision = async (_req: Request, res: Response) => {
    const { data } = _req.body
    try {
      const divisions = await Promise.all([
        await data.map(async (value: string) => {
          await DivisionRepos.destroy({
            where: { id: value },
          })
        }),
        await DivisionRepos.findAll({}),
      ])
      res.status(200).json(divisions[1])
    } catch (err: any) {
      res.status(500).json({ error: ['db error', err] })
    }
  }

  updateDivision = async (_req: Request, res: Response) => {
    const { selectedDivisions } = _req.body
    try {
      await DivisionRepos.update(selectedDivisions, {
        active: false,
      })
      const divisions = await DivisionRepos.findAll({ where: { active: true } })
      res.status(200).json(divisions)
    } catch (err: any) {
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
