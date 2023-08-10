import type { Request, Response } from 'express'
import { userRepos } from '../db'
import { Result, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import { auth } from '../data/auth'
import jwt from 'jsonwebtoken'
import {User} from '../models/users'
import { ModelAttributes } from 'sequelize'
import { Model } from 'sequelize-typescript'

const generateAccessToken = (
  id: string,
  roles: string,
  username: string
): string => {
  const payload = { id, roles, username }
  return jwt.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: '24h',
  })
}
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
    const newUser = { ..._req.body, password: hashPassword }
    userRepos
      .update(id, { ...newUser })
      .then(resp => {
        if (resp[0] === 0) {
          userRepos.create(newUser)
        }
        res.status(200).json('set user ok')
      })
      .catch(err =>
        res.status(500).json({ error: ['db error: unable to set user', err] })
      )
  }
  login = (_req: Request, res: Response) => {
    const { username, password } = _req.body;
    userRepos
      .findAll({
        where: { username: username },
      })
      .then((user: ModelAttributes<Model, User>{}) => {
        const validPassword = bcrypt.compareSync(
          password,
          user?.password
        );
        
        res.status(200).json(user)})
      .catch(err => res.status(400).json({ message: `auth.notification.userNotFound, ${err}`}))
  }
  check = (_req: Request, res: Response) => {
    try {
      const token = generateAccessToken(
        _req.body.id,
        _req.body.roles,
        _req.body.username
      )
      return res.json({ token })
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: `${err.message}` })
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
