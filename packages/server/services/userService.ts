import type { Request, Response } from 'express'
import { userRepos } from '../db'
import { Result, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import { auth } from '../data/auth'
import { generateAccessToken } from '../utils/generateAccessToken'

export class userService {
  setUser = (_req: Request, res: Response) => {
    const errValidation: Result = validationResult(_req)
    if (!errValidation.isEmpty()) {
      const errors = errValidation.array()
      return res.status(400).json({
        message: `${auth.notification.errorRegistration.ENG}: ${errors[0].msg}`,
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
    userRepos
      .update(id, { ...newUser })
      .then(resp => {
        if (resp[0] === 0) {
          userRepos.create(newUser)
        }
        res.status(200).json(auth.notification.successfulRegistration)
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: [auth.notification.errorRegistration, err] })
      )
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
        const { username, firstName, lastName, email, phone, avatar, theme } =
          user[0]
        return res.json({
          token,
          username,
          firstName,
          lastName,
          email,
          phone,
          avatar,
          theme,
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
          const { username, firstName, lastName, email, phone, avatar, theme } =
            user[0]
          return res.json({
            token,
            username,
            firstName,
            lastName,
            email,
            phone,
            avatar,
            theme,
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

  getUsers = (_req: Request, res: Response) => {
    userRepos
      .findAll({})
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  getUserInfo = (_req: Request, res: Response) => {
    const { id } = _req.body
    userRepos
      .findAll({
        where: { id },
      })
      .then(user => {
        const { username, firstName, lastName, email, phone, avatar, theme } =
          user[0]
        res
          .status(200)
          .json({ username, firstName, lastName, email, phone, avatar, theme })
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteUser = (_req: Request, res: Response) => {
    const { id, username } = _req.body
    userRepos
      .update(id, { active: false })
      .then(user =>
        res
          .status(200)
          .json(
            `User ${username} with id=${user} has acquired the inactive status!`
          )
      )
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
}
