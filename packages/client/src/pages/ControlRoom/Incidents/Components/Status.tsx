import { memo, useEffect, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownIncidents } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { IStatus } from '../interfaces'
import { customDropDownCell } from '../data'
import { useMessage } from 'hooks/message/useMessage'

export const Status = memo(
  ({ value, id, incident, currentStatus }: IStatus) => {
    const [{ user }] = useAuth()
    const [_, { setMessage }] = useMessage()
    const [{ incStatuses }, { changeStatus, getIncidentStatuses }] =
      useIncidents()
    const [status, setStatus] = useState<Options>({
      label: value,
      id: '',
    })

    const setData = (data: Options) => {
      const newStatus = incStatuses.findIndex(item => item.id === data.id)
      const oldStatus = incStatuses.findIndex(
        item => item.statusINC === currentStatus
      )
      if (newStatus < 0) {
        setMessage({
          text: `Необходимо выбрать статус!`,
          type: 'warning',
        })
        return
      }
      if (newStatus <= oldStatus) {
        if (newStatus === oldStatus) return
        setMessage({
          text: `Нельзя перевести в статус "${data.label}"!`,
          type: 'warning',
        })
        return
      }
      setStatus(data)
      changeStatus({
        id,
        id_incStatus: data.id as string,
        incident,
        status: data.label,
        userID: user.id as string,
      })
    }

    useEffect(() => {
      setStatus({
        label: value,
        id: '',
      })
    }, [value])

    useEffect(() => {
      getIncidentStatuses()
    }, [value])

    return (
      <DropDownIncidents
        data={incStatuses.map(({ statusINC, id }) => {
          return {
            ['label']: statusINC,
            ['id']: id as string,
          }
        })}
        props={customDropDownCell}
        textProps={{ fontSize: '0.775rem' }}
        onChange={setData}
        value={status.label}
        label="Выберите статус"
        errorLabel="Не выбран статус!"
        disableClearable={true}
      />
    )
  }
)
