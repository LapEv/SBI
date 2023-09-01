import type { Request, Response } from 'express'
import { roleRepos, roleGroupRepos } from '../db'

export class roleService {
  newRoleGroup = (_req: Request, res: Response) => {
    roleGroupRepos
      .create(_req.body)
      .then(roleGroup => {
        res.status(200).json(`set roleGroup ok, ${roleGroup}`)
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: ['db error: unable to set roleGroup', err] })
      )
  }
  getRolesGroup = (_req: Request, res: Response) => {
    roleGroupRepos
      .findAll({})
      .then(roleGroup => res.status(200).json(roleGroup))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  deleteRoleGroup = (_req: Request, res: Response) => {
    const { group } = _req.body
    roleGroupRepos
      .destroy({
        where: { group },
      })
      .then(result =>
        res.status(200).json(`Role=${group} id:${result} deleted!`)
      )
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  getAllRolesGroup = () => {
    roleGroupRepos
      .findAll({})
      .then(roleGroup => console.log('roleGroup = ', roleGroup))
      /* eslint-disable */
      .catch(err => {
        error: `db error, ${err.status}`
      })
    /* eslint-enable */
  }

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
  getAllRoles = () => {
    roleRepos
      .findAll({})
      .then(roles => roles.map(value => value.roles))
      /* eslint-disable */
      .catch(err => {
        error: `db error, ${err.status}`
      })
    /* eslint-enable */
  }
}
