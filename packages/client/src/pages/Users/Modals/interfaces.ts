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
