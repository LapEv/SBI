import type { Request, Response } from 'express'
import { userRepos } from '../db'

export class userService {
  setUser = (_req: Request, res: Response) => {
    const id = _req.body.id ?? 0
    userRepos
      .update(id, { ..._req.body })
      .then(resp => {
        if (resp[0] === 0) {
          userRepos.create(_req.body)
        }
        res.status(200).json('set user ok')
      })
      .catch(err =>
        res.status(500).json({ error: ['db error: unable to set user', err] })
      )
  }
  getUser = (_req: Request, res: Response) => {
    userRepos
      .findAll({
        where: { id: _req.query.id },
      })
      .then(users => res.status(200).json(users))
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  getUsers = (_req: Request, res: Response) => {
    userRepos
      .findAll({})
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteUser = (_req: Request, res: Response) => {
    const { id, username } = _req.body
    userRepos
      .delete(id)
      .then(user =>
        res.status(200).json(`User ${username} with id=${user} deleted!`)
      )
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
}
