import { memo } from 'react'
import { FormControlLabel, Switch } from '@mui/material'

interface IDragTable {
  dragTable: boolean
  setDragTable: (data: boolean) => void
}

export const DragTable = memo(({ dragTable, setDragTable }: IDragTable) => {
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
