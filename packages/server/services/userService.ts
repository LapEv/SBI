import type { Request, Response } from 'express'
import { DepartmentRepos, userRepos } from '../db'
import { Result, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import { auth } from '../data/auth'
import { generateAccessToken } from '../utils/generateAccessToken'
import { Op } from 'sequelize'
import { incidentService } from './incidentService'
import { IUser } from '/models/users'
import { IDepartment } from '/models/departments'

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
    const { password, firstName, lastName, middleName } = _req.body
    const shortName = `${lastName} ${firstName.slice(0, 1)}.${middleName.slice(
      0,
      1,
    )}.`
    const hashPassword = bcrypt.hashSync(password, 7)
    const newUser = {
      ..._req.body,
      shortName,
      firstName,
      lastName,
      middleName,
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
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  login = async (_req: Request, res: Response) => {
    try {
      const { username, password } = _req.body
      const user = (await userRepos.findOne({
        where: { username: username },
      })) as IUser
      if (!user) {
        return res.status(400).json({ message: auth.notification.userNotFound })
      }
      const validPassword = bcrypt.compareSync(password, user?.password)

      if (!validPassword) {
        return res
          .status(400)
          .json({ message: auth.notification.invalidPassword })
      }
      const token = generateAccessToken(user.id, user.rolesGroup, user.username)
      if (
        user &&
        (user.rolesGroup === 'ADMIN' ||
          user.rolesGroup === 'SUPERADMIN' ||
          user.rolesGroup === 'Dispatcher')
      ) {
        const service = new incidentService()
        const filterData = await service.getFilterListFunc()
        return res.json({
          token,
          user,
          filterData,
        })
      }

      return res.json({
        token,
        user,
      })
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changePassword = async (_req: Request, res: Response) => {
    const { oldPassword, newPassword, id } = _req.body
    const user = (await userRepos.findAll({
      where: { id },
    })) as IUser[]
    const validPassword = bcrypt.compareSync(oldPassword, user[0].password)
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: auth.notification.invalidOldPassword })
    }
    const errValidation: Result = validationResult(_req)
    if (!errValidation.isEmpty()) {
      const errors = errValidation.array()
      return res.status(400).json({
        message: `${auth.notification.errorValidation}: ${errors[0].msg}`,
        errValidation,
      })
    }
    const hashPassword = bcrypt.hashSync(newPassword, 7)
    try {
      await userRepos.update(id, { password: hashPassword })
      res.status(200).json('Ok')
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeAvatar = async (_req: Request, res: Response) => {
    const { oldPassword, newPassword, id } = _req.body
    const user = (await userRepos.findAll({
      where: { id },
    })) as IUser[]
    const validPassword = bcrypt.compareSync(oldPassword, user[0].password)
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: auth.notification.invalidOldPassword })
    }
    const errValidation: Result = validationResult(_req)
    if (!errValidation.isEmpty()) {
      const errors = errValidation.array()
      return res.status(400).json({
        message: `${auth.notification.errorValidation}: ${errors[0].msg}`,
        errValidation,
      })
    }
    const hashPassword = bcrypt.hashSync(newPassword, 7)
    try {
      await userRepos.update(id, { password: hashPassword })
      res.status(200).json('Ok')
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  check = async (_req: Request, res: Response) => {
    const { username, id, rolesGroup } = _req.body
    try {
      const token = generateAccessToken(id, rolesGroup, username)
      const user = (await userRepos.findOne({
        where: { id: id },
      })) as IUser

      if (
        user &&
        (user.rolesGroup === 'ADMIN' ||
          user.rolesGroup === 'SUPERADMIN' ||
          user.rolesGroup === 'Dispatcher')
      ) {
        const service = new incidentService()
        const filterData = await service.getFilterListFunc()
        return res.json({
          token,
          user,
          filterData,
        })
      }

      return res.json({
        token,
        user,
      })
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
        include: { all: true },
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => res.status(500).json({ error: ['db error: ', err] }))
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
  getFieldEngineers = async (_req: Request, res: Response) => {
    const departments = (await DepartmentRepos.findAll({
      where: { active: true },
    })) as IDepartment[]
    const id_department = departments.find(
      item => item.department === 'FieldEngineers',
    )?.id
    userRepos
      .findAll({
        where: { id_department, active: true },
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  getDispatchers = async (_req: Request, res: Response) => {
    const departments = (await DepartmentRepos.findAll({
      where: { active: true },
    })) as IDepartment[]
    const id_department = departments.find(
      item => item.department === 'Dispatcher',
    )?.id
    userRepos
      .findAll({
        where: {
          [Op.or]: [
            { id_department, active: true },
            { rolesGroup: 'SUPERADMIN' },
          ],
        },
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
  deleteUser = async (_req: Request, res: Response) => {
    const { id, reasonOfDelete } = _req.body
    try {
      await userRepos.update(id, {
        active: false,
        reasonOfDelete,
      })
      const users = await userRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullUserInArchive = async (_req: Request, res: Response) => {
    const { selectedUsers } = _req.body
    try {
      await userRepos.update(selectedUsers, {
        active: true,
      })
      const users = await userRepos.findAll({
        where: { active: true, reasonOfDelete: '' },
      })
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteUser = async (_req: Request, res: Response) => {
    const { selectedUsers } = _req.body
    try {
      await userRepos.destroy({
        where: { id: selectedUsers },
      })
      const users = await userRepos.findAll({})
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeTheme = (_req: Request, res: Response) => {
    const { id, theme } = _req.body
    userRepos
      .update(id, { theme: theme })
      .then(user =>
        res
          .status(200)
          .json(`Theme changed for user with id=${user} on ${theme}!`),
      )
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  updateUser = async (_req: Request, res: Response) => {
    const { id, userData } = _req.body
    const shortName = `${userData.lastName} ${userData.firstName.slice(
      0,
      1,
    )}.${userData.middleName.slice(0, 1)}.`
    try {
      await userRepos.update(id, { ...userData, shortName })
      const { id_division, id_department } = userData
      const dataFind = { id_division, id_department, active: true }
      const rolesGroup = await userRepos.findAll({ where: dataFind })
      res.status(200).json(rolesGroup)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  updateProfile = async (_req: Request, res: Response) => {
    const { id, userData } = _req.body
    const shortName = `${userData.lastName} ${userData.firstName.slice(
      0,
      1,
    )}.${userData.middleName.slice(0, 1)}.`
    try {
      await userRepos.update(id, { ...userData, shortName })
      const { id_division, id_department } = userData
      const dataFind = { id_division, id_department, active: true }
      const rolesGroup = await userRepos.findAll({ where: dataFind })
      res.status(200).json(rolesGroup)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}
