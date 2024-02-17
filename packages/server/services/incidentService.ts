import {
  Addresses,
  ClassifierEquipment,
  ClassifierModels,
  Clients,
  Contracts,
  Files,
  IncidentLogs,
  IncidentLogsRepos,
  IncidentRepos,
  IncidentStatusesRepos,
  IncindentStatuses,
  Objects,
  Regions,
  SLA,
  TypesCompletedWork,
  TypesCompletedWorkRepos,
  TypesOfWork,
  TypesOfWorkRepos,
  TypicalMalfunctions,
  Users,
} from './../db'
import type { Request, Response } from 'express'
import { AppConst } from '../const'
import {
  convertDateToString,
  convertINCStringToDateTime,
} from '../utils/convertDate'
import { mailerChangeStatus, mailerRegInc } from '../Mailer'
import { IIncindentStatuses } from '/models/incidents'
import { Order } from 'sequelize'

const incLogs = [
  {
    model: Users,
    required: true,
    attributes: [
      'id',
      'username',
      'firstName',
      'lastName',
      'middleName',
      'shortName',
      'active',
    ],
  },
]

const includes = [
  {
    model: IncindentStatuses,
    required: true,
    // attributes: ['id', 'statusINC', 'active'],
    attributes: [],
    duplicating: false,
  },
  {
    model: TypesOfWork,
    required: true,
    attributes: ['id', 'typeOfWork', 'active'],
  },
  {
    model: TypesCompletedWork,
    required: false,
    attributes: ['id', 'typeCompletedWork', 'active'],
  },
  {
    model: SLA,
    required: true,
    attributes: ['id', 'sla', 'days', 'time', 'timeStart', 'timeEnd', 'active'],
  },
  {
    model: Clients,
    required: true,
    attributes: ['id', 'legalName', 'client', 'active'],
  },
  {
    model: Contracts,
    required: true,
    attributes: ['id', 'contract', 'active', 'notificationEmail'],
    include: [
      {
        model: IncindentStatuses,
        required: true,
      },
    ],
  },
  {
    model: Objects,
    required: true,
    attributes: [
      'id',
      'object',
      'internalClientID',
      'internalClientName',
      'active',
    ],
    include: [
      {
        model: Addresses,
        required: true,
        attributes: ['id', 'address', 'coordinates', 'active'],
      },
      {
        model: Regions,
        required: true,
        attributes: ['id', 'region', 'active'],
      },
    ],
  },
  {
    model: Users,
    required: true,
    attributes: [
      'id',
      'username',
      'firstName',
      'lastName',
      'middleName',
      'shortName',
      'active',
    ],
  },
  {
    model: Users,
    as: 'UserExecutor',
    required: false,
    attributes: [
      'id',
      'username',
      'firstName',
      'lastName',
      'middleName',
      'shortName',
      'active',
    ],
  },
  {
    model: Users,
    as: 'UserResponsible',
    required: false,
    attributes: [
      'id',
      'username',
      'firstName',
      'lastName',
      'middleName',
      'shortName',
      'active',
    ],
  },
  {
    model: Users,
    as: 'UserClosingCheck',
    required: false,
    attributes: [
      'id',
      'username',
      'firstName',
      'lastName',
      'middleName',
      'shortName',
      'active',
    ],
  },
  {
    model: Users,
    as: 'UserClosing',
    required: false,
    attributes: [
      'id',
      'username',
      'firstName',
      'lastName',
      'middleName',
      'shortName',
      'active',
    ],
  },
  {
    model: ClassifierEquipment,
    required: true,
    attributes: ['id', 'equipment', 'active'],
  },
  {
    model: ClassifierModels,
    required: true,
    attributes: ['id', 'model', 'active'],
  },
  {
    model: TypicalMalfunctions,
    required: true,
    attributes: ['id', 'typicalMalfunction', 'active'],
  },
  {
    model: IncidentLogs,
    required: false,
    attributes: ['id', 'time', 'log'],
    include: incLogs,
  },
  {
    model: Files,
    required: false,
    attributes: ['id', 'name', 'size', 'mimetype', 'path'],
  },
]

export class incidentService {
  newIncidentStatuses = async (_req: Request, res: Response) => {
    try {
      await IncidentStatusesRepos.create({ ..._req.body, active: true })
      const incStatuses = await IncidentStatusesRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(incStatuses)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to set new incident statuses', err],
      })
    }
  }
  getAllIncidentStatuses = (_req: Request, res: Response) => {
    IncidentStatusesRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getIncidentStatuses = (_req: Request, res: Response) => {
    IncidentStatusesRepos.findAll({
      where: { active: true },
    })
      .then(incStatuses => {
        res.status(200).json(incStatuses)
      })
      .catch(err => res.status(500).json({ error: ['db error:', err] }))
  }
  deleteIncidentStatuses = async (_req: Request, res: Response) => {
    const { selectedINCStatuses } = _req.body
    try {
      await IncidentStatusesRepos.update(selectedINCStatuses, {
        active: false,
      })
      const incStatuses = await IncidentStatusesRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(incStatuses)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error: ', err] })
    }
  }
  fullDeleteIncidentStatuses = async (_req: Request, res: Response) => {
    const { selectedINCStatuses } = _req.body
    try {
      await IncidentStatusesRepos.destroy({
        where: { id: selectedINCStatuses },
      })
      const incStatuses = await IncidentStatusesRepos.findAll({})
      res.status(200).json(incStatuses)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  pullIncidentStatusesFromArchive = async (_req: Request, res: Response) => {
    const { selectedINCStatuses } = _req.body
    try {
      await IncidentStatusesRepos.update(selectedINCStatuses, {
        active: true,
      })
      const incStatuses = await IncidentStatusesRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(incStatuses)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeIncidentStatuses = async (_req: Request, res: Response) => {
    const { statusINC, id } = _req.body
    try {
      await IncidentStatusesRepos.update(id, { statusINC })
      const incStatuses = await IncidentStatusesRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(incStatuses)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  newTypeOfWork = async (_req: Request, res: Response) => {
    try {
      await TypesOfWorkRepos.create({ ..._req.body, active: true })
      const typesOfWork = await TypesOfWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesOfWork)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to set new incident statuses', err],
      })
    }
  }
  getAllTypesOfWork = (_req: Request, res: Response) => {
    TypesOfWorkRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getTypesOfWork = (_req: Request, res: Response) => {
    TypesOfWorkRepos.findAll({
      where: { active: true },
    })
      .then(typesOfWork => {
        res.status(200).json(typesOfWork)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteTypesOfWork = async (_req: Request, res: Response) => {
    const { selectedTypesOfWork } = _req.body
    try {
      await TypesOfWorkRepos.update(selectedTypesOfWork, {
        active: false,
      })
      const typesOfWork = await TypesOfWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesOfWork)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  fullDeleteTypesOfWork = async (_req: Request, res: Response) => {
    const { selectedTypesOfWork } = _req.body
    try {
      await TypesOfWorkRepos.destroy({
        where: { id: selectedTypesOfWork },
      })
      const typesOfWork = await TypesOfWorkRepos.findAll({})
      res.status(200).json(typesOfWork)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  pullTypesOfWorkFromArchive = async (_req: Request, res: Response) => {
    const { selectedTypesOfWork } = _req.body
    try {
      await TypesOfWorkRepos.update(selectedTypesOfWork, {
        active: true,
      })
      const typesOfWork = await TypesOfWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesOfWork)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeTypesOfWork = async (_req: Request, res: Response) => {
    const { typeOfWork, id } = _req.body
    try {
      await TypesOfWorkRepos.update(id, { typeOfWork })
      const typesOfWork = await TypesOfWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesOfWork)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  newTypeCompletedWork = async (_req: Request, res: Response) => {
    try {
      await TypesCompletedWorkRepos.create({ ..._req.body, active: true })
      const typesCompletedWork = await TypesCompletedWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesCompletedWork)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to set new incident statuses', err],
      })
    }
  }
  getAllTypesCompletedWork = (_req: Request, res: Response) => {
    TypesCompletedWorkRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getTypesCompletedWork = (_req: Request, res: Response) => {
    TypesCompletedWorkRepos.findAll({
      where: { active: true },
    })
      .then(typesCompletedWork => {
        res.status(200).json(typesCompletedWork)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteTypesCompletedWork = async (_req: Request, res: Response) => {
    const { selectedTypeCompletedWork } = _req.body
    try {
      await TypesCompletedWorkRepos.update(selectedTypeCompletedWork, {
        active: false,
      })
      const typesCompletedWork = await TypesCompletedWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesCompletedWork)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  fullDeleteTypesCompletedWork = async (_req: Request, res: Response) => {
    const { selectedTypeCompletedWork } = _req.body
    try {
      await TypesCompletedWorkRepos.destroy({
        where: { id: selectedTypeCompletedWork },
      })
      const typesCompletedWork = await TypesCompletedWorkRepos.findAll({})
      res.status(200).json(typesCompletedWork)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  pullTypesCompletedWorkFromArchive = async (_req: Request, res: Response) => {
    const { selectedTypeCompletedWork } = _req.body
    try {
      await TypesCompletedWorkRepos.update(selectedTypeCompletedWork, {
        active: true,
      })
      const typesCompletedWork = await TypesCompletedWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesCompletedWork)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeTypesCompletedWork = async (_req: Request, res: Response) => {
    const { typeCompletedWork, id } = _req.body
    try {
      await TypesCompletedWorkRepos.update(id, { typeCompletedWork })
      const typesCompletedWork = await TypesCompletedWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesCompletedWork)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  newINC = async (_req: Request, res: Response) => {
    const {
      id_incStatus,
      clientINC,
      timeSLA,
      description,
      comment,
      methodsReuqest,
      parentalIncident,
      relatedIncident,
      applicant,
      applicantContacts,
      clientID,
      typeOfWorkID,
      SLAID,
      contractID,
      objectID,
      responsibleID,
      equipmentId,
      modelId,
      typicalMalfunctionID,
      nameSort,
      direction,
      limit,
      page,
    } = _req.body
    try {
      const lastINC = await IncidentRepos.findAll({
        limit: 1,
        order: [['createdAt', 'DESC']],
      })
      const numberINC =
        !lastINC || !lastINC.length
          ? AppConst.startINC
          : lastINC[0].numberINC + 1
      const incident = `${AppConst.attrINC}0000${numberINC}`
      const timeRegistration = new Date(
        new Date().getTime() +
          Math.abs(new Date().getTimezoneOffset() * 60 * 1000)
      )
      const newINCdb = await IncidentRepos.create({
        numberINC,
        incident,
        clientINC,
        timeSLA,
        timeRegistration,
        description,
        comment,
        methodsReuqest,
        parentalIncident,
        relatedIncident,
        applicant,
        applicantContacts,
        active: true,
        id_incClient: clientID,
        id_incStatus,
        id_typeOfWork: typeOfWorkID,
        id_incSLA: SLAID,
        id_incContract: contractID,
        id_incObject: objectID,
        id_incUser: responsibleID,
        id_incEquipment: equipmentId,
        id_incModel: modelId,
        id_incTypicalMalfunction: typicalMalfunctionID,
        id_executor: '',
        id_responsible: '',
        id_closingCheck: '',
        id_closing: '',
      })
      await IncidentLogsRepos.create({
        id_incLog: newINCdb.id,
        time: timeRegistration,
        log: `${AppConst.ActionComment.incidentRegistration}${incident}`,
        id_incLogUser: responsibleID,
      })
      const inc = await IncidentRepos.findAll({
        where: { id: newINCdb.id },
        include: includes,
      })

      const isStatusses = inc[0]?.Contract.IncindentStatuses.map(
        (item: IIncindentStatuses) =>
          item.statusINC === inc[0]?.IncindentStatus.statusINC
      ).filter((item: boolean) => item)

      if (isStatusses && isStatusses.length) {
        const info = await mailerRegInc({
          mailTo: inc[0]?.Contract.notificationEmail ?? '',
          incident,
          status: inc[0]?.IncindentStatus.statusINC ?? '',
          clientINC,
          timeRegistration: convertDateToString(timeRegistration) ?? '',
          timeSLA,
          client: inc[0]?.Client?.client ?? '',
          object: inc[0]?.Object?.object ?? '',
          objectClientID: inc[0]?.Object?.internalClientID ?? '',
          objectClientName: inc[0]?.Object?.internalClientName ?? '',
          address: inc[0]?.Object?.Address?.address as string,
          equipment: inc[0]?.ClassifierEquipment?.equipment as string,
          model: inc[0]?.ClassifierModel?.model as string,
          malfunction: inc[0]?.TypicalMalfunction?.typicalMalfunction as string,
          description: description ?? '',
          applicant: applicant ?? '',
          applicantContacts: applicantContacts ?? '',
          userAccepted: inc[0]?.User?.shortName ?? '',
        })
        console.log('infoMailer Reg = ', info)
      }

      const offset = Number(page) * Number(limit) ?? 1
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        order: [[nameSort as string, direction as string]],
        limit: Number(limit),
        offset,
        include: includes,
      })
      const count = await IncidentRepos.count({})
      res.status(200).json({ incs, count })
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      console.log('err = ', err)
      res.status(500).json({
        error: ['db error: unable to set new incident: ', err],
      })
    }
  }
  getAllINC = (_req: Request, res: Response) => {
    IncidentRepos.findAll({ include: includes })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error: ', err.status] }))
  }
  getINC = async (_req: Request, res: Response) => {
    try {
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        include: includes,
      })
      const count = await IncidentRepos.count({})
      res.status(200).json({ incs, count })
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      console.log('err = ', err)
      res.status(500).json({ error: ['db error', err] })
    }
  }
  getINCs = async (_req: Request, res: Response) => {
    try {
      const { limit, nameSort, direction, page } = _req.query
      const offset = Number(page) * Number(limit) ?? 1
      console.log('getINCs!')
      console.log('page = ', page)
      console.log('limit = ', limit)
      console.log('offset = ', offset)
      const order =
        nameSort === 'executor'
          ? ([
              [
                { model: Users, as: 'UserExecutor' },
                'shortName',
                direction as string,
              ],
            ] as Order)
          : ([[nameSort as string, direction as string]] as Order)
      console.log('order = ', order)
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        // include: { all: true, nested: true },
        include: { all: true },
        // include: includes,
        order,
        limit: Number(limit),
        offset,
        logging: console.log,
      })
      const count = await IncidentRepos.count({})
      res.status(200).json({ incs, count })
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      console.log('err = ', err)
      res.status(500).json({ error: ['db error', err] })
    }
  }
  deleteINC = async (_req: Request, res: Response) => {
    const { selectedINCs } = _req.body
    try {
      await IncidentRepos.update(selectedINCs, {
        active: false,
      })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  fullDeleteINC = async (_req: Request, res: Response) => {
    const { selectedINCs } = _req.body
    try {
      await IncidentRepos.destroy({
        where: { id: selectedINCs },
      })
      const incs = await IncidentRepos.findAll({ include: includes })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  pullINCFromArchive = async (_req: Request, res: Response) => {
    const { selectedINCs } = _req.body
    try {
      await IncidentRepos.update(selectedINCs, {
        active: true,
      })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeINC = async (_req: Request, res: Response) => {
    const { id, ...data } = _req.body
    try {
      await IncidentRepos.update(id, { data })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeExecutor = async (_req: Request, res: Response) => {
    const {
      id,
      id_incExecutor,
      incident,
      executor,
      userID,
      nameSort,
      direction,
      limit,
      page,
    } = _req.body
    try {
      await IncidentRepos.update(id, {
        id_incExecutor: id_incExecutor.length ? id_incExecutor : null,
      })
      const currentDate = new Date(
        new Date().getTime() +
          Math.abs(new Date().getTimezoneOffset() * 60 * 1000)
      )

      await IncidentLogsRepos.create({
        id_incLog: id,
        time: currentDate,
        log: `${AppConst.ActionComment.changeExecutor.first}${incident}${AppConst.ActionComment.changeExecutor.second}${executor}`,
        id_incLogUser: userID,
      })

      const offset = Number(page) * Number(limit) ?? 1
      const order =
        nameSort === 'status'
          ? ([[IncindentStatuses, 'statusINC', direction as string]] as Order)
          : ([[nameSort as string, direction as string]] as Order)

      const incs = await IncidentRepos.findAll({
        where: { active: true },
        order,
        limit: Number(limit),
        offset,
        include: includes,
      })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error: ', err] })
    }
  }
  changeResponsible = async (_req: Request, res: Response) => {
    const {
      id,
      id_incResponsible,
      incident,
      responsible,
      userID,
      nameSort,
      direction,
      limit,
      page,
    } = _req.body
    try {
      await IncidentRepos.update(id, {
        id_incResponsible: id_incResponsible.length ? id_incResponsible : null,
      })
      const currentDate = new Date(
        new Date().getTime() +
          Math.abs(new Date().getTimezoneOffset() * 60 * 1000)
      )
      await IncidentLogsRepos.create({
        id_incLog: id,
        time: currentDate,
        log: `${AppConst.ActionComment.changeResponsible.first}${incident}${AppConst.ActionComment.changeResponsible.second}${responsible}`,
        id_incLogUser: userID,
      })

      const offset = Number(page) * Number(limit) ?? 1
      const order =
        nameSort === 'status'
          ? ([[IncindentStatuses, 'statusINC', direction as string]] as Order)
          : ([[nameSort as string, direction as string]] as Order)
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        // include: { all: true },
        order,
        limit: Number(limit),
        offset,
        include: includes,
      })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeStatus = async (_req: Request, res: Response) => {
    const {
      id,
      id_incStatus,
      incident,
      status,
      userID,
      timeSLA,
      commentCloseCheck,
      spaceParts,
      commentClose,
      typeCompletedWork,
      nameSort,
      direction,
      limit,
      page,
    } = _req.body
    try {
      const incStatuses = await IncidentStatusesRepos.findAll({
        where: { active: true },
      })
      const inc = await IncidentRepos.findAll({
        where: { id },
        include: includes,
      })
      const newStatus = incStatuses.findIndex(item => item.id === id_incStatus)
      const currentDate = new Date(
        new Date().getTime() +
          Math.abs(new Date().getTimezoneOffset() * 60 * 1000)
      )
      const timeInWork = newStatus === 1 ? currentDate : inc[0].timeInWork
      const id_incResponsible =
        newStatus === 1 ? userID : inc[0].id_incResponsible
      const timeCloseCheck =
        newStatus === 2 ? currentDate : inc[0].timeCloseCheck
      const id_incClosingCheck =
        newStatus === 2 ? userID : inc[0].id_incClosingCheck
      const id_typeCompletedWork =
        newStatus === 2 ? typeCompletedWork.id : inc[0].id_typeCompletedWork

      const sla = new Date(convertINCStringToDateTime(timeSLA)).getTime()
      const now = currentDate.getTime()
      const overdue = newStatus === 2 && now > sla ? true : inc[0].overdue
      const timeClose = newStatus === 3 ? currentDate : inc[0].timeClose
      const id_incClosing = newStatus === 3 ? userID : inc[0].id_incClosing
      await IncidentRepos.update(id, {
        id_incStatus,
        timeInWork,
        timeCloseCheck,
        timeClose,
        id_incResponsible,
        id_incClosingCheck,
        id_incClosing,
        id_typeCompletedWork,
        overdue,
        commentClose: commentClose ?? '',
        commentCloseCheck: commentCloseCheck ?? '',
        spaceParts: spaceParts ?? [],
      })
      await IncidentLogsRepos.create({
        id_incLog: id,
        time: currentDate,
        log: `${AppConst.ActionComment.changeStatus.first}${incident}${AppConst.ActionComment.changeStatus.second}${status}`,
        id_incLogUser: userID,
      })
      const isStatusses = inc[0]?.Contract.IncindentStatuses.filter(
        (item: IIncindentStatuses) => item.id === id_incStatus
      ).filter((item: boolean) => item)

      if (isStatusses && isStatusses.length) {
        const info = await mailerChangeStatus({
          mailTo: inc[0]?.Contract.notificationEmail ?? '',
          incident,
          status,
          clientINC: inc[0]?.clientINC,
          timeChangeStatus: convertDateToString(currentDate) ?? '',
          timeSLA,
          client: inc[0]?.Client?.client ?? '',
          object: inc[0]?.Object?.object ?? '',
          objectClientID: inc[0]?.Object?.internalClientID ?? '',
          objectClientName: inc[0]?.Object?.internalClientName ?? '',
          address: inc[0]?.Object?.Address?.address as string,
          equipment: inc[0]?.ClassifierEquipment?.equipment as string,
          model: inc[0]?.ClassifierModel?.model as string,
          malfunction: inc[0]?.TypicalMalfunction?.typicalMalfunction as string,
          description: inc[0]?.description ?? '',
          commentCloseCheck: commentCloseCheck ?? inc[0]?.commentCloseCheck,
          typeCompletedWork:
            typeCompletedWork && typeCompletedWork.label
              ? typeCompletedWork.label
              : inc[0]?.typeCompletedWork,
        })
        console.log('infoMailer Reg = ', info)
      }

      const offset = Number(page) * Number(limit) ?? 1
      const order =
        nameSort === 'status'
          ? ([[IncindentStatuses, 'statusINC', direction as string]] as Order)
          : ([[nameSort as string, direction as string]] as Order)

      const incs = await IncidentRepos.findAll({
        where: { active: true },
        // include: { all: true },
        order,
        limit: Number(limit),
        offset,
        include: includes,
      })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      console.log('err = ', err)
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error: ', err] })
    }
  }
  changeUserClosingCheck = async (_req: Request, res: Response) => {
    const { id, id_incClosingCheck } = _req.body
    try {
      await IncidentRepos.update(id, { id_incClosingCheck })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        // include: { all: true },
        include: includes,
      })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeUserClosing = async (_req: Request, res: Response) => {
    const { id, id_incClosing } = _req.body
    try {
      await IncidentRepos.update(id, { id_incClosing })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        // include: { all: true },
        include: includes,
      })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  getAllINCLogs = (_req: Request, res: Response) => {
    IncidentLogsRepos.findAll({ include: incLogs })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getINCLogs = (_req: Request, res: Response) => {
    IncidentLogsRepos.findAll({
      where: { active: true },
      include: incLogs,
    })
      .then(logs => {
        res.status(200).json(logs)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
}
