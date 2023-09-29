import React from 'react'

export interface ChooseModalProps {
  modalImage?: string
  handleModal: (state: boolean) => void
  title?: string
}

export interface AddValuesProps {
  list: {
    name: string
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
  value?: string
  props?: object
  onChange?: (value: string) => void
}

export interface Data {
  category: string
  categoryName: string
  id: string
}
