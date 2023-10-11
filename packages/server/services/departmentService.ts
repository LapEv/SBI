import type { Request, Response } from 'express'
import { DepartmentRepos } from '../db'

export class departmentService {
  newDepartment = async (_req: Request, res: Response) => {
    const { department, departmentName, division, id_division } = _req.body
    console.log('department = ', department)
    console.log('departmentName = ', departmentName)
    console.log('division = ', division)
    console.log('id_division = ', id_division)
    try {
      await DepartmentRepos.create({
        department,
        departmentName,
        division,
        id_division,
        active: true,
      })
      const departments = await DepartmentRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(departments)
    } catch (err: any) {
      res.status(500).json({ error: ['db error: unable to set division', err] })
    }
  }
  getDepartments = (_req: Request, res: Response) => {
    DepartmentRepos.findAll({ where: { active: true } })
      .then(departments => res.status(200).json(departments))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getAllDepartments = (_req: Request, res: Response) => {
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

  updateDepartment = async (_req: Request, res: Response) => {
    const { selectedDivisions } = _req.body
    try {
      await DepartmentRepos.update(selectedDivisions, {
        active: false,
      })
      const divisions = await DepartmentRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(divisions)
    } catch (err: any) {
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
