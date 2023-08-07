import type { Request, Response } from 'express'
import { roleRepos } from '../db'

export class roleService {
  setRole = (_req: Request, res: Response) => {
    roleRepos
      .update(_req.body.id, { ..._req.body })
      .then(resp => {
        if (resp[0] === 0) {
          roleRepos.create(_req.body)
        }
        res.status(200).json('set role ok')
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: ['db error: unable to set role', err.status] })
      )
  }
  getRole = (_req: Request, res: Response) => {
    roleRepos
      .findAll({
        where: { id: _req.query.id },
      })
      .then(role => res.status(200).json(role))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getRoles = (_req: Request, res: Response) => {
    roleRepos
      .findAll({})
      .then(roles => res.status(200).json(roles))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
}
