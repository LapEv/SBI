import { memo, useEffect, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDown } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { IExecutor } from '../interfaces'
import { customCellHeight } from '../data'

export const UserResponsible = memo(({ value, id }: IExecutor) => {
  const [{ dispatchers }] = useAuth()
  const [_, { changeResponsible }] = useIncidents()
  const [responsible, setResposible] = useState<Options>({
    label: value,
    id: '',
  })

  const setData = (data: Options) => {
    setResposible(data)
    changeResponsible({ id, id_incResponsible: data.id })
  }

  useEffect(() => {
    setResposible({
      label: value,
      id: '',
    })
  }, [value])

  return (
    <DropDown
      data={dispatchers.map(({ lastName, firstName, middleName, id }) => {
        return {
          ['label']: `${lastName} ${firstName?.slice(0, 1)}.${middleName?.slice(
            0,
            1
          )}.` as string,
          ['id']: id as string,
        }
      })}
      props={{ width: 300, height: customCellHeight }}
      onChange={setData}
      value={responsible.label}
      label="Выберите ответственного"
      errorLabel="Не выбран ответственный!"
    />
  )
})
