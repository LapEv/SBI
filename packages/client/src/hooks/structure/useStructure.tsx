import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store/hooks'
import { StructureActions } from './structureActions'
import {
  deleteDivision,
  getDepartments,
  getDivisions,
  newDepartment,
  newDivision,
} from 'api/structure'
import { StructureState, setActiveDivision } from 'store/slices/structure'
import { RootState } from 'store'

export function useStructure(): [StructureState, StructureActions] {
  const structure = useSelector((state: RootState) => state.structure)
  const dispatch = useAppDispatch()

  return [
    structure,
    {
      getDivisions() {
        dispatch(getDivisions())
      },
      getDepartments() {
        dispatch(getDepartments())
      },
      addDivision(data) {
        dispatch(newDivision(data))
      },
      addDepartments(department, division) {
        dispatch(newDepartment({ department, division }))
      },
      deleteDivision(divisions) {
        dispatch(deleteDivision(divisions))
      },

      setActiveDivision(division) {
        dispatch(setActiveDivision(division))
      },
    },
  ]
}
