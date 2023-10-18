import type { Request, Response } from 'express'
import { userRepos } from '../db'
import { Result, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import { auth } from '../data/auth'
import { generateAccessToken } from '../utils/generateAccessToken'

export class userService {
  setUser = async (_req: Request, res: Response) => {
    const errValidation: Result = validationResult(_req)
    if (!errValidation.isEmpty()) {
      const errors = errValidation.array()
      return res.status(400).json({
        message: `${auth.notification.errorRegistration}: ${errors[0].msg}`,
        errValidation,
      })
    }
    const id = _req.body.id ?? 0
    const { password } = _req.body
    const hashPassword = bcrypt.hashSync(password, 7)
    const newUser = {
      ..._req.body,
      password: hashPassword,
      active: true,
      theme: 'light',
    }

    try {
      if (id === 0) {
        await userRepos.create(newUser)
        res.status(200).json(newUser)
      } else {
        await userRepos.update(id, { ...newUser })
        res.status(200).json(newUser)
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res
        .status(500)
        .json({ error: [auth.notification.errorRegistration, err] })
    }
  }

  login = (_req: Request, res: Response) => {
    const { username, password } = _req.body
    userRepos
      .findAll({
        where: { username: username },
      })
      .then(user => {
        const validPassword = bcrypt.compareSync(password, user[0].password)
        if (!validPassword) {
          return res
            .status(400)
            .json({ message: auth.notification.invalidPassword })
        }
        const token = generateAccessToken(
          user[0].id,
          user[0].roles,
          user[0].username
        )
        const userData = user[0]
        return res.json({
          token,
          ...userData.dataValues,
        })
      })
      .catch(err =>
        res
          .status(400)
          .json({ message: `${auth.notification.userNotFound}, ${err}` })
      )
  }

  check = (_req: Request, res: Response) => {
    const { username, id, roles } = _req.body
    try {
      const token = generateAccessToken(id, roles, username)
      userRepos
        .findAll({
          where: { id: id },
        })
        .then(user => {
          const userData = user[0]
          return res.json({
            token,
            ...userData.dataValues,
          })
        })
        .catch(err =>
          res
            .status(400)
            .json({ message: `${auth.notification.userNotFound}, ${err}` })
        )
    } catch (err) {
      if (err instanceof Error) {
        return res
          .status(400)
          .json({ message: `Unexpected error message ${err.message}` })
      } else {
        return res.status(400).json({ message: `Unexpected error ${err}` })
      }
    }
  }

  getActiveUsers = (_req: Request, res: Response) => {
    const dataFind = { ..._req.body, active: true }
    userRepos
      .findAll({
        where: dataFind,
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  getUsers = (_req: Request, res: Response) => {
    userRepos
      .findAll({
        where: _req.body,
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  getUserInfo = (_req: Request, res: Response) => {
    const { id } = _req.body
    userRepos
      .findAll({
        where: { id },
      })
      .then(user => {
        const userData = user[0]
        res.status(200).json(userData)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteUsers = async (_req: Request, res: Response) => {
    const { selectedUsers } = _req.body
    try {
      const user = await userRepos.update(selectedUsers, {
        active: false,
      })
      res
        .status(200)
        .json(
          `User ${selectedUsers} with id=${user} has acquired the inactive status!`
        )
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  getUserInArchive = async (_req: Request, res: Response) => {
    const { selectedUsers } = _req.body
    try {
      await userRepos.update(selectedUsers, {
        active: true,
      })
      const users = await userRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(users)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  fullDeleteUser = async (_req: Request, res: Response) => {
    const { selectedUsers } = _req.body
    try {
      const users = await Promise.all([
        await selectedUsers.map(async (value: string) => {
          await userRepos.destroy({
            where: { id: value },
          })
        }),
        await userRepos.findAll({}),
      ])
      res.status(200).json(users[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeTheme = (_req: Request, res: Response) => {
    const { id, theme } = _req.body
    userRepos
      .update(id, { theme: theme })
      .then(user =>
        res
          .status(200)
          .json(`Theme changed for user with id=${user} on ${theme}!`)
      )
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
}
