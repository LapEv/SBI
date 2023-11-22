import type { Request, Response } from 'express'
import { UserStatusRepos } from '../db'
const { Op } = require('sequelize')

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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
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
        await data.map(async (id: string) => {
          await UserStatusRepos.destroy({
            where: { id },
          })
        }),
        await UserStatusRepos.findAll({ where: { id: { [Op.not]: data } } }),
      ])
      res.status(200).json(userStatus[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
