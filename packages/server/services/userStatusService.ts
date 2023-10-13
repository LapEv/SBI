import type { Request, Response } from 'express'
import { UserStatusRepos } from '../db'

export class userStatusService {
  setNewUserStatus = async (_req: Request, res: Response) => {
    const { status, statusName } = _req.body
    try {
      await UserStatusRepos.create({
        status,
        statusName,
      })
      const userStatus = await UserStatusRepos.findAll({})
      res.status(200).json(userStatus)
    } catch (err: any) {
      res.status(500).json({ error: ['db error: unable to set division', err] })
    }
  }
  getUserStatus = (_req: Request, res: Response) => {
    UserStatusRepos.findAll({})
      .then(userStatus => res.status(200).json(userStatus))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  deleteUserStatus = async (_req: Request, res: Response) => {
    const { data } = _req.body
    try {
      const userStatus = await Promise.all([
        await data.map(async (value: string) => {
          await UserStatusRepos.destroy({
            where: { id: value },
          })
        }),
        await UserStatusRepos.findAll({}),
      ])
      res.status(200).json(userStatus[1])
    } catch (err: any) {
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
