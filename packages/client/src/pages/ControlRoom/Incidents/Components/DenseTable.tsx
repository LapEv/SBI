import { memo } from 'react'
import { FormControlLabel, Switch } from '@mui/material'

interface IDenseTable {
  denseTable: boolean
  setDenseTable: (data: boolean) => void
}

export const DenseTable = memo(({ denseTable, setDenseTable }: IDenseTable) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={denseTable}
          onChange={event => setDenseTable(event.target.checked)}
          value="denseTable"
          color="primary"
        />
      }
      label="Сжать"
    />
  )
})

interface IIsDragTable {
  dragTable: boolean
  setDragTable: (data: boolean) => void
}

export const IsDragTable = memo(({ dragTable, setDragTable }: IIsDragTable) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={dragTable}
          onChange={event => setDragTable(event.target.checked)}
          value="dragTable"
          color="primary"
        />
      }
      label="Перетащить"
    />
  )
})
