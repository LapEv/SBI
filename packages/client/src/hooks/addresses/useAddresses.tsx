import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { AddressesActions } from './AddressesActions'
import { AddressesState } from 'store/slices/addresses/interfaces'
import {
  getAddresses,
  getRegions,
  newAddress,
  newRegion,
  deleteAddress,
  deleteRegion,
  changeAddress,
  changeRegion,
} from 'api/address'

export function useAddresses(): [AddressesState, AddressesActions] {
  const addresses = useSelector((state: RootState) => state.addresses)
  const dispatch = useAppDispatch()

  return [
    addresses,
    {
      getAddresses() {
        dispatch(getAddresses())
      },
      getRegions() {
        dispatch(getRegions())
      },
      newAddress(data) {
        dispatch(newAddress(data))
      },
      newRegion(data) {
        dispatch(newRegion(data))
      },
      deleteAddress(data) {
        dispatch(deleteAddress(data))
      },
      deleteRegion(data) {
        dispatch(deleteRegion(data))
      },
      changeAddress(address, id) {
        dispatch(changeAddress({ address, id }))
      },
      changeRegion(region, id) {
        dispatch(changeRegion({ region, id }))
      },
    },
  ]
}
