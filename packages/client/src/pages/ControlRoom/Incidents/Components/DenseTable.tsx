import { MouseEvent, memo, useState } from 'react'
import { FormControlLabel, Switch, Box, Tooltip } from '@mui/material'
import { PopoverINC } from 'components/Popover/Popover'

interface IDenseTable {
  denseTable: boolean
  setDenseTable: (data: boolean) => void
}

export const DenseTable = memo(({ denseTable, setDenseTable }: IDenseTable) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null)

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorMenuEl(event.currentTarget)
  }

  return (
    <Tooltip title={'Сжать таблицу'}>
      <FormControlLabel
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        control={
          <Switch
            checked={denseTable}
            onClick={handleClick}
            onChange={event => setDenseTable(event.target.checked)}
            value="denseTable"
            color="primary"
          />
        }
        label="Сжать"
      />
    </Tooltip>
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
