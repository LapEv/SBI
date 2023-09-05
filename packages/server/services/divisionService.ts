import type { Request, Response } from 'express'
import { DivisionRepos } from '../db'

export class divisionService {
  newDivision = (_req: Request, res: Response) => {
    DivisionRepos.create(_req.body)
      .then(division => {
        res.status(200).json(`set department ok, ${division}`)
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: ['db error: unable to set department', err] })
      )
  }
  getDivisions = (_req: Request, res: Response) => {
    DivisionRepos.findAll({})
      .then(divisions => res.status(200).json(divisions))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  deleteDivision = (_req: Request, res: Response) => {
    const { division, id } = _req.body
    DivisionRepos.destroy({
      where: { division, id },
    })
      .then(result =>
        res.status(200).json(`Role=${division} id:${result} deleted!`)
      )
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
}
