import type { Request, Response } from 'express'
import { roleRepos } from '../db'

export class roleService {
  newRole = (_req: Request, res: Response) => {
    roleRepos
      .create(_req.body)
      .then(role => {
        res.status(200).json(`set role ok, ${role}`)
      })
      .catch(err =>
        res.status(500).json({ error: ['db error: unable to set role', err] })
      )
  }
  getRoles = (_req: Request, res: Response) => {
    roleRepos
      .findAll({})
      .then(roles => res.status(200).json(roles))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  deleteRole = (_req: Request, res: Response) => {
    const { role } = _req.body
    roleRepos
      .destroy({
        where: { role: role },
      })
      .then(result =>
        res.status(200).json(`Role=${role} id:${result} deleted!`)
      )
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
}
