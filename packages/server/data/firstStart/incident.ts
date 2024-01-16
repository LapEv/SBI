import { AppConst } from '../../const'

export const incStatusesStartData = [
  {
    statusINC: AppConst.Statuses.registered,
    active: true,
  },
  {
    statusINC: AppConst.Statuses.inWork,
    active: true,
  },
  {
    statusINC: AppConst.Statuses.resolved,
    active: true,
  },
  {
    statusINC: AppConst.Statuses.closed,
    active: true,
  },
]

export const typesOfWorkStartData = [
  {
    typeOfWork: 'РВР',
    active: true,
  },
  {
    typeOfWork: 'ППР',
    active: true,
  },
  {
    typeOfWork: 'Замена ФН',
    active: true,
  },
  {
    typeOfWork: 'Проект',
    active: true,
  },
  {
    typeOfWork: 'Реакция',
    active: true,
  },
]
