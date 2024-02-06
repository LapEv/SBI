import { memo, useEffect, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownIncidents } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { IExecutor } from '../interfaces'
import { customDropDownCell } from '../data'

export const UserResponsible = memo(({ value, id, incident }: IExecutor) => {
  const [{ dispatchers, user }] = useAuth()
  const [_, { changeResponsible }] = useIncidents()
  const [responsible, setResposible] = useState<Options>({
    label: value,
    id: '',
  })

  const setData = (data: Options) => {
    setResposible(data)
    changeResponsible({
      id,
      id_incResponsible: data.id as string,
      incident,
      responsible: data.label,
      userID: user.id as string,
    })
  }

  useEffect(() => {
    setResposible({
      label: value,
      id: '',
    })
  }, [value])

  return (
    <DropDownIncidents
      data={dispatchers.map(({ lastName, firstName, middleName, id }) => {
        return {
          ['label']: `${lastName} ${firstName?.slice(0, 1)}.${middleName?.slice(
            0,
            1
          )}.` as string,
          ['id']: id as string,
        }
      })}
      props={customDropDownCell}
      textProps={{ fontSize: '0.775rem' }}
      onChange={setData}
      value={responsible.label}
      label="Выберите ответственного"
      errorLabel="Не выбран ответственный!"
    />
  )
})
