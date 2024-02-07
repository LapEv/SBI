import { memo, useEffect, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownIncidents } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { IExecutor } from '../interfaces'
import { customDropDownCell } from '../data'

export const Status = memo(({ value, id, incident }: IExecutor) => {
  const [{ user }] = useAuth()
  const [{ incStatuses }, { changeStatus }] = useIncidents()
  const [status, setStatus] = useState<Options>({
    label: value,
    id: '',
  })

  const setData = (data: Options) => {
    setStatus(data)
    changeStatus({
      id,
      id_incResponsible: data.id as string,
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
    />
  )
})
