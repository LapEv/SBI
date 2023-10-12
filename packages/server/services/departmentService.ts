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

  deleteDepartment = async (_req: Request, res: Response) => {
    const { data } = _req.body
    try {
      const departaments = await Promise.all([
        await data.map(async (value: string) => {
          await DepartmentRepos.destroy({
            where: { id: value },
          })
        }),
        await DepartmentRepos.findAll({}),
      ])
      res.status(200).json(departaments[1])
    } catch (err: any) {
      res.status(500).json({ error: ['db error', err] })
    }
  }

  updateDepartment = async (_req: Request, res: Response) => {
    const { selectedDepartments } = _req.body
    try {
      await DepartmentRepos.update(selectedDepartments, {
        active: false,
      })
      const departaments = await DepartmentRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(departaments)
    } catch (err: any) {
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
