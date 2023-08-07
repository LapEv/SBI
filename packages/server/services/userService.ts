import type { Request, Response } from 'express'
import { userRepos } from '../db'

export class userService {
  setUser = (_req: Request, res: Response) => {
    userRepos
      .update(_req.body.id, { ..._req.body })
      .then(resp => {
        if (resp[0] === 0) {
          userRepos.create(_req.body)
        }
        res.status(200).json('set user ok')
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: ['db error: unable to set user', err.status] })
      )
  }
  getUser = (_req: Request, res: Response) => {
    userRepos
      .findAll({
        where: { id: _req.query.id },
      })
      .then(users => res.status(200).json(users))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getUsers = (_req: Request, res: Response) => {
    userRepos
      .findAll({})
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
}
