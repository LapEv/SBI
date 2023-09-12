import React from 'react'

export interface ChooseModalProps {
  modalImage?: string
  handleModal: (state: boolean) => void
  title?: string
  // modalRef: typeof React.createRef
}

export interface AddValuesProps {
  list: {
    label: string
    value: string
    validation: object
    type: string
  }[]
}

export interface DataDropDown {
  data: {
    category: string
    categoryName: string
    id: string
  }[]
  props?: object
  onBlur?: (data: string) => void
}

export interface Data {
  category: string
  categoryName: string
  id: string
}
