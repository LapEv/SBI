import React from 'react'

export interface ChangeDivisionProps {
  handleModal: (state: boolean) => void
  handleChange: (data: { division: string }) => void
  ref: typeof React.createRef
}

export interface DivisionValuesProps {
  list: {
    label: string
    value: string
    validation: object
    type: string
  }[]
}
