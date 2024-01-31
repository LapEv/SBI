import { FormControlLabel, Switch } from '@mui/material'

interface IDenseTable {
  denseTable: boolean
  setDenseTable: (data: boolean) => void
}

export const DenseTable = ({ denseTable, setDenseTable }: IDenseTable) => {
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
      label="Dense Table"
    />
  )
}
