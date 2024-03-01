import {
  Addresses,
  AddressesRepos,
  ClassifierEquipment,
  ClassifierEquipmentRepos,
  ClassifierModels,
  ClassifierModelsRepos,
  Clients,
  ClientsRepos,
  Contracts,
  ContractsRepos,
  Files,
  IncidentLogs,
  IncidentLogsRepos,
  IncidentRepos,
  IncidentStatusesRepos,
  IncindentStatuses,
  Objects,
  ObjectsRepos,
  Regions,
  RegionsRepos,
  SLA,
  SLARepos,
  TypesCompletedWork,
  TypesCompletedWorkRepos,
  TypesOfWork,
  TypesOfWorkRepos,
  TypicalMalfunctions,
  Users,
  userRepos,
} from './../db'
import type { Request, Response } from 'express'
import { AppConst } from '../const'
import {
  convertDateToString,
  convertINCStringToDateTime,
} from '../utils/convertDate'
import { mailerChangeStatus, mailerRegInc } from '../Mailer'
import { IIncindentStatuses } from '/models/incidents'
import { Op, Order, WhereOptions } from 'sequelize'

const getOrder = (nameSort: string, direction: string) => {
  if (nameSort === 'contract') {
    return [['id_incContract', direction as string]] as Order
  }
  if (nameSort === 'client') {
    return [['id_incClient', direction as string]] as Order
  }
  if (
    nameSort === 'object' ||
    nameSort === 'address' ||
    nameSort === 'region'
  ) {
    return [['id_incObject', direction as string]] as Order
  }
  if (nameSort === 'equipment') {
    return [['id_incEquipment', direction as string]] as Order
  }
  if (nameSort === 'model') {
    return [['id_incModel', direction as string]] as Order
  }
  return [[nameSort as string, direction as string]] as Order
}
export class incidentService {
  get Includes() {
    return this.includes
  }

  set IncludesAddress(data: string) {
    const incl = this.includes.map(item => {
      if (item.model === Objects) {
        return {
          model: Objects,
          required: true,
          attributes: [
            'id',
            'object',
            'internalClientID',
            'internalClientName',
            'active',
          ],
          include: item.include?.map(value => {
            if (value.model === Addresses) {
              return {
                model: Addresses,
                required: true,
                attributes: ['id', 'address', 'coordinates', 'active'],
                where: { id: data },
              }
            }
            return value
          }) as [],
        }
      }
      return item
    })
    this.includes = incl
  }

  set IncludesRegion(data: string) {
    const incl = this.includes.map(item => {
      if (item.model === Objects) {
        return {
          model: Objects,
          required: true,
          attributes: [
            'id',
            'object',
            'internalClientID',
            'internalClientName',
            'active',
          ],
          include: item.include?.map(value => {
            if (value.model === Regions) {
              return {
                model: Regions,
                required: true,
                attributes: ['id', 'region', 'active'],
                where: { id: data },
              }
            }
            return value
          }) as [],
        }
      }
      return item
    })
    this.includes = incl
  }

  get ResetIncludesAddress() {
    const incl = this.includes.map(item => {
      if (item.model === Objects) {
        return {
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
        }
      }
      return item
    })
    this.includes = incl
    return this.includes
  }

  incLogs = [
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

  includes = [
    {
      model: IncindentStatuses,
      required: true,
      attributes: ['id', 'statusINC', 'active'],
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
      attributes: [
        'id',
        'sla',
        'days',
        'time',
        'timeStart',
        'timeEnd',
        'active',
      ],
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
          required: false,
          attributes: ['id', 'statusINC', 'active'],
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
      include: this.incLogs,
    },
    {
      model: Files,
      required: false,
      attributes: ['id', 'name', 'size', 'mimetype', 'path'],
    },
  ]

  checkDataFilter = async (data: []) => {
    console.log('data = ', data)
    return await Promise.all(
      data.map(
        async (item: []) =>
          await Promise.all(
            item.map(async value => {
              if (value['contract']) {
                const contract = await ContractsRepos.findOne({
                  where: { contract: value['contract'] },
                })
                return { id_incContract: contract?.id }
              }
              if (value['client']) {
                const client = await ClientsRepos.findOne({
                  where: { client: value['client'] },
                })
                return { id_incClient: client?.id }
              }
              if (value['legalName']) {
                const legalName = await ClientsRepos.findOne({
                  where: { legalName: value['legalName'] },
                })
                return { id_incClient: legalName?.id }
              }
              if (value['object']) {
                const object = await ObjectsRepos.findOne({
                  where: { object: value['object'] },
                })
                return { id_incObject: object?.id }
              }
              if (value['address']) {
                const address = await AddressesRepos.findOne({
                  where: { address: value['address'] },
                })
                this.IncludesAddress = address?.id
                return []
              }
              if (value['region']) {
                const region = await RegionsRepos.findOne({
                  where: { region: value['region'] },
                })
                this.IncludesRegion = region?.id
                return []
              }
              if (value['userAccepted']) {
                const userAccepted = await userRepos.findOne({
                  where: { shortName: value['userAccepted'] },
                })
                return { id_incUser: userAccepted?.id }
              }
              if (value['sla']) {
                const sla = await SLARepos.findOne({
                  where: { sla: value['sla'] },
                })
                return { id_incSLA: sla?.id }
              }
              if (value['equipment']) {
                const equipment = await ClassifierEquipmentRepos.findOne({
                  where: { equipment: value['equipment'] },
                })
                return { id_incEquipment: equipment?.id }
              }
              if (value['model']) {
                const model = await ClassifierModelsRepos.findOne({
                  where: { model: value['model'] },
                })
                return { id_incModel: model?.id }
              }
              if (value['executor']) {
                const executor = await userRepos.findOne({
                  where: { shortName: value['executor'] },
                })
                return { id_incExecutor: executor?.id }
              }
              if (value['responsible']) {
                const responsible = await userRepos.findOne({
                  where: { shortName: value['responsible'] },
                })
                return { id_incResponsible: responsible?.id }
              }

              return value
            })
          )
      )
    )
  }

  getFilterOptions = async (data: []): Promise<WhereOptions> => {
    if (!data) {
      return [{ active: 'true' }]
    }
    const dataFilter = await this.checkDataFilter(data)
    const _dataFilter = dataFilter.filter(
      elem => elem.filter(item => !Array.isArray(item) || item.length).length
    )

    return _dataFilter.map(item => {
      return { [Op.or]: item as WhereOptions }
    })
  }

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
      res.status(500).json({ error: ['db error:', err] })
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
      filterOptions,
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

      const status = await IncidentStatusesRepos.findOne({
        where: { id: id_incStatus },
      })

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
        status: status?.statusINC,
      })
      await IncidentLogsRepos.create({
        id_incLog: newINCdb.id,
        time: timeRegistration,
        log: `${AppConst.ActionComment.incidentRegistration}${incident}`,
        id_incLogUser: responsibleID,
      })

      const inc = await IncidentRepos.findOne({
        where: { id: newINCdb.id },
        include: this.includes,
      })

      const isStatusses = inc?.Contract.IncindentStatuses.map(
        (item: IIncindentStatuses) =>
          item.statusINC === inc?.IncindentStatus.statusINC
      ).filter((item: boolean) => item)

      if (isStatusses && isStatusses.length) {
        const info = await mailerRegInc({
          mailTo: inc?.Contract.notificationEmail ?? '',
          incident,
          status: inc?.IncindentStatus.statusINC ?? '',
          clientINC,
          timeRegistration: convertDateToString(timeRegistration) ?? '',
          timeSLA,
          client: inc?.Client?.client ?? '',
          legalName: inc?.Client?.legalName ?? '',
          object: inc?.Object?.object ?? '',
          objectClientID: inc?.Object?.internalClientID ?? '',
          objectClientName: inc?.Object?.internalClientName ?? '',
          address: inc?.Object?.Address?.address as string,
          equipment: inc?.ClassifierEquipment?.equipment as string,
          model: inc?.ClassifierModel?.model as string,
          malfunction: inc?.TypicalMalfunction?.typicalMalfunction as string,
          description: description ?? '',
          applicant: applicant ?? '',
          applicantContacts: applicantContacts ?? '',
          userAccepted: inc?.User?.shortName ?? '',
        })
        console.log('infoMailer Reg = ', info)
      }

      const offset = Number(page) * Number(limit) ?? 1
      const order = getOrder(nameSort, direction)
      const filterData = await this.getFilterOptions(filterOptions as [])

      const incs = await IncidentRepos.findAll({
        where: { [Op.and]: filterData },
        order,
        limit: Number(limit),
        offset,
        include: this.includes,
      })
      const count = await IncidentRepos.count({
        where: { [Op.and]: filterData },
      })
      const filterListData = await this.getFilterListFunc()
      res.status(200).json({ incs, count, filterListData })
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
    IncidentRepos.findAll({ include: this.includes })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error: ', err.status] }))
  }
  getINC = async (_req: Request, res: Response) => {
    try {
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        include: this.includes,
      })
      const count = incs.length
      res.status(200).json({ incs, count })
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      console.log('err = ', err)
      res.status(500).json({ error: ['db error', err] })
    }
  }

  getFilter = async (_req: Request, res: Response) => {
    try {
      const filterListData = await this.getFilterListFunc()
      res.status(200).json(filterListData)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      console.log('err = ', err)
      res.status(500).json({ error: ['db error', err] })
    }
  }

  getFilterListFunc = async () => {
    const incs = await IncidentRepos.findAll({
      where: { active: true },
      include: this.includes,
    })
    const statusList =
      [...new Set(incs.map(item => item.IncindentStatus.statusINC))] ?? []
    const contractList =
      [...new Set(incs.map(item => item.Contract.contract))] ?? []
    const clientsList = [...new Set(incs.map(item => item.Client.client))] ?? []
    const legalNameList =
      [...new Set(incs.map(item => item.Client.legalName))] ?? []
    const objectsList = [...new Set(incs.map(item => item.Object.object))] ?? []
    const addressList =
      [...new Set(incs.map(item => item.Object.Address.address))] ?? []
    const regionList =
      [...new Set(incs.map(item => item.Object.Region.region))] ?? []
    const userAcceptedList =
      [...new Set(incs.map(item => item.User.shortName))] ?? []
    const equipmentList =
      [...new Set(incs.map(item => item.ClassifierEquipment.equipment))] ?? []
    const modelList =
      [...new Set(incs.map(item => item.ClassifierModel.model))] ?? []
    const executorList =
      [
        ...new Set(
          incs.map(item =>
            item.UserExecutor ? item.UserExecutor.shortName : ''
          )
        ),
      ] ?? []
    const responsibleList =
      [
        ...new Set(
          incs.map(item =>
            item.UserResponsible ? item.UserResponsible.shortName : ''
          )
        ),
      ] ?? []
    const overdueList = [...new Set(incs.map(item => item.overdue))] ?? []
    const slaList = [...new Set(incs.map(item => item.SLA.sla))] ?? []

    return {
      status: statusList,
      legalName: legalNameList,
      client: clientsList,
      contract: contractList,
      object: objectsList,
      address: addressList,
      region: regionList,
      userAccepted: userAcceptedList,
      equipment: equipmentList,
      model: modelList,
      executor: executorList,
      responsible: responsibleList,
      overdue: overdueList,
      sla: slaList,
    }
  }

  getINCs = async (_req: Request, res: Response) => {
    try {
      const counts = await IncidentRepos.count({})
      const filterListData = await this.getFilterListFunc()

      if (counts === 0) {
        res.status(200).json({ incs: [], count: counts, filterListData })
        return
      }
      const { limit, nameSort, direction, page, filterOptions } = _req.query
      const filterData = await this.getFilterOptions(filterOptions as [])
      const offset = Number(page) * Number(limit) ?? 1
      const order = getOrder(nameSort as string, direction as string)

      const incs = await IncidentRepos.findAll({
        where: { [Op.and]: filterData },
        // include: { all: true, nested: true },
        // include: { all: true },
        include: this.Includes,
        order,
        limit: Number(limit),
        offset,
      })
      this.ResetIncludesAddress
      const count = await IncidentRepos.count({
        where: { [Op.and]: filterData },
      })
      res.status(200).json({ incs, count, filterListData })
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
        include: this.includes,
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
      const incs = await IncidentRepos.findAll({ include: this.includes })
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
        include: this.includes,
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
        include: this.includes,
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
      filterOptions,
    } = _req.body
    try {
      await IncidentRepos.update(id, {
        id_incExecutor: id_incExecutor.length ? id_incExecutor : null,
        executor,
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
      const order = getOrder(nameSort as string, direction as string)
      const filterData = await this.getFilterOptions(filterOptions as [])

      const incs = await IncidentRepos.findAll({
        where: { [Op.and]: filterData },
        order,
        limit: Number(limit),
        offset,
        include: this.includes,
      })
      const filterListData = await this.getFilterListFunc()
      res.status(200).json({ incs, filterListData })
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
      filterOptions,
    } = _req.body
    try {
      await IncidentRepos.update(id, {
        id_incResponsible: id_incResponsible.length ? id_incResponsible : null,
        responsible,
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
      const order = getOrder(nameSort as string, direction as string)
      const filterData = await this.getFilterOptions(filterOptions as [])
      const incs = await IncidentRepos.findAll({
        where: { [Op.and]: filterData },
        // include: { all: true },
        order,
        limit: Number(limit),
        offset,
        include: this.includes,
      })
      const filterListData = await this.getFilterListFunc()
      res.status(200).json({ incs, filterListData })
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
      filterOptions,
    } = _req.body
    try {
      const incStatuses = await IncidentStatusesRepos.findAll({
        where: { active: true },
      })
      const inc = await IncidentRepos.findOne({
        where: { id },
        include: this.includes,
      })
      const newStatus = incStatuses.findIndex(item => item.id === id_incStatus)

      const currentDate = new Date(
        new Date().getTime() +
          Math.abs(new Date().getTimezoneOffset() * 60 * 1000)
      )
      const timeInWork = newStatus === 1 ? currentDate : inc?.timeInWork
      const id_incResponsible =
        newStatus === 1 ? userID : inc?.id_incResponsible
      const timeCloseCheck = newStatus === 2 ? currentDate : inc?.timeCloseCheck
      const id_incClosingCheck =
        newStatus === 2 ? userID : inc?.id_incClosingCheck
      const id_typeCompletedWork =
        newStatus === 2 ? typeCompletedWork.id : inc?.id_typeCompletedWork

      const sla = new Date(convertINCStringToDateTime(timeSLA)).getTime()
      const now = currentDate.getTime()
      const overdue = newStatus === 2 && now > sla ? true : inc?.overdue
      const timeClose = newStatus === 3 ? currentDate : inc?.timeClose
      const id_incClosing = newStatus === 3 ? userID : inc?.id_incClosing

      await IncidentRepos.update(id, {
        id_incStatus,
        status,
        timeInWork,
        timeCloseCheck: timeCloseCheck ?? null,
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
      const isStatusses = inc?.Contract.IncindentStatuses.filter(
        (item: IIncindentStatuses) => item.id === id_incStatus
      ).filter((item: boolean) => item)

      if (isStatusses && isStatusses.length) {
        const info = await mailerChangeStatus({
          mailTo: inc?.Contract.notificationEmail ?? '',
          incident,
          status,
          clientINC: inc?.clientINC,
          timeChangeStatus: convertDateToString(currentDate) ?? '',
          timeSLA,
          client: inc?.Client?.client ?? '',
          legalName: inc?.Client?.legalName ?? '',
          object: inc?.Object?.object ?? '',
          objectClientID: inc?.Object?.internalClientID ?? '',
          objectClientName: inc?.Object?.internalClientName ?? '',
          address: inc?.Object?.Address?.address as string,
          equipment: inc?.ClassifierEquipment?.equipment as string,
          model: inc?.ClassifierModel?.model as string,
          malfunction: inc?.TypicalMalfunction?.typicalMalfunction as string,
          description: inc?.description ?? '',
          commentCloseCheck: commentCloseCheck ?? inc?.commentCloseCheck,
          typeCompletedWork:
            typeCompletedWork && typeCompletedWork.label
              ? typeCompletedWork.label
              : inc?.typeCompletedWork,
        })
        console.log('infoMailer Reg = ', info)
      }

      const offset = Number(page) * Number(limit) ?? 1
      const order = getOrder(nameSort as string, direction as string)
      const filterData = await this.getFilterOptions(filterOptions as [])

      const incs = await IncidentRepos.findAll({
        where: { [Op.and]: filterData },
        // include: { all: true },
        order,
        limit: Number(limit),
        offset,
        include: this.includes,
      })
      const filterListData = await this.getFilterListFunc()
      res.status(200).json({ incs, filterListData })
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      console.log('err = ', err)
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error:  ', err] })
    }
  }
  changeUserClosingCheck = async (_req: Request, res: Response) => {
    const { id, id_incClosingCheck } = _req.body
    try {
      await IncidentRepos.update(id, { id_incClosingCheck })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        // include: { all: true },
        include: this.includes,
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
        include: this.includes,
      })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  changeComment = async (_req: Request, res: Response) => {
    const { id, comment } = _req.body
    try {
      await IncidentRepos.update(id, { comment })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        // include: { all: true },
        include: this.includes,
      })
      res.status(200).json(incs)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }

  getAllINCLogs = (_req: Request, res: Response) => {
    IncidentLogsRepos.findAll({ include: this.incLogs })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getINCLogs = (_req: Request, res: Response) => {
    IncidentLogsRepos.findAll({
      where: { active: true },
      include: this.incLogs,
    })
      .then(logs => {
        res.status(200).json(logs)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
}
