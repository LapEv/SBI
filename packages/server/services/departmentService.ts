import type { Request, Response } from 'express'
import { DepartmentRepos } from '../db'

export class departmentService {
  newDepartment = (_req: Request, res: Response) => {
    DepartmentRepos.create(_req.body)
      .then(department => {
        res.status(200).json(`set department ok, ${department}`)
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: ['db error: unable to set department', err] })
      )
  }
  getDepartments = (_req: Request, res: Response) => {
    DepartmentRepos.findAll({})
      .then(departments => res.status(200).json(departments))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  deleteDepartment = (_req: Request, res: Response) => {
    const { department, id } = _req.body
    DepartmentRepos.destroy({
      where: { department, id },
    })
      .then(result =>
        res.status(200).json(`Role=${department} id:${result} deleted!`)
      )
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
}
