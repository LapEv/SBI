import { memo, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownIncidents } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { IExecutor } from '../interfaces'
import { customDropDownCell } from '../data'

export const Executor = memo(({ value, id }: IExecutor) => {
  const [{ fieldEngineers, user }] = useAuth()
  const [_, { changeExecutor, changeResponsible }] = useIncidents()
  const [executor, setExecutor] = useState<Options>({ label: value, id: '' })

  const setData = (data: Options) => {
    setExecutor(data)
    changeExecutor({ id, id_incExecutor: data.id })
    changeResponsible({ id, id_incResponsible: user.id })
  }

  return (
    <DropDownIncidents
      data={fieldEngineers.map(({ lastName, firstName, middleName, id }) => {
        return {
          ['label']: `${lastName} ${firstName?.slice(0, 1)}.${middleName?.slice(
            0,
            1
          )}.` as string,
          ['id']: id as string,
        }
      })}
      props={customDropDownCell}
      onChange={setData}
      value={executor.label}
      label="Выберите исполнителя"
      errorLabel="Не выбран исполнитель!"
    />
  )
})
