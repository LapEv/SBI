import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store/hooks'
import { StructureActions } from './structureActions'
import { getDepartments, getDivisions } from 'api/structure'
import { StructureState } from 'store/slices/structure'
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
    },
  ]
}
