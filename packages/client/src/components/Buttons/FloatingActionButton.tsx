import { useState, MouseEvent, type PropsWithChildren } from 'react'
import MuiFab from '@mui/material/Fab'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

type FabProps = PropsWithChildren<{
  title: string
  order?: number
  onClick: () => void
  active?: boolean
}>

export function Fab({ order = 0, title, active, ...props }: FabProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  return (
    <>
      <MuiFab
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        color={active ? 'secondary' : 'primary'}
        size="small"
        sx={{
          position: 'fixed',
          bottom: 8 + order * 49,
          left: 16,
          borderRadius: '20%',
          zIndex: 1300,
        }}
        {...props}
      />
      <Popover
        sx={{
          pointerEvents: 'none',
          background: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        container={anchorEl}>
        <Typography sx={{ p: 1, fontSize: 12, color: 'text.primary' }}>
          {title}
        </Typography>
      </Popover>
    </>
  )
}
