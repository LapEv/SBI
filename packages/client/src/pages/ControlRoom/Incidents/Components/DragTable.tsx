import { MouseEvent, memo, useState } from 'react'
import { FormControlLabel, Switch, Box } from '@mui/material'
import { PopoverINC } from 'components/Popover/Popover'
import { IDragTable } from './interfaces'

export const DragTable = memo(({ dragTable, setDragTable }: IDragTable) => {
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
    <>
      <FormControlLabel
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        control={
          <Switch
            checked={dragTable}
            onClick={handleClick}
            onChange={event => setDragTable(event.target.checked)}
            value="dragTable"
            color="primary"
          />
        }
        label="Столбцы"
      />
      <PopoverINC
        sx={{
          pointerEvents: 'none',
          background: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        container={anchorEl}>
        <Box
          sx={{
            p: 0.5,
            pl: 1,
            pr: 1,
            color: 'text.primary',
            backgroundColor: 'rgba(97, 97, 97, 0.92)',
            fontFamily: 'Raleway',
            fontSize: '0.6875rem',
            fontWeight: 500,
          }}>
          Перемещение столбцов
        </Box>
      </PopoverINC>
    </>
  )
})
