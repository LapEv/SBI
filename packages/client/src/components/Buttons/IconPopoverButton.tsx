import { useState, MouseEvent } from 'react'
import { Box, Typography, useTheme, Popover, IconButton } from '@mui/material'

interface IconButtonProps {
  popover: string
  vertical?: 'top' | 'center' | 'bottom' | number
  onClick: () => void
  icon?: JSX.Element
  sx?: any
  propsPopover?: any
  size?: 'small' | 'medium' | 'large'
}

export function IconPopoverButton({
  popover,
  onClick,
  icon,
  vertical,
  size,
  sx,
  propsPopover,
}: IconButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const theme = useTheme()

  const sxDefault = {
    m: 1,
    width: 40,
    height: 40,
    borderRadius: '20%',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    boxShadow: 5,
  }

  const open = Boolean(anchorEl)
  return (
    <>
      <IconButton
        onMouseEnter={(event: MouseEvent<HTMLElement>) =>
          setAnchorEl(event.currentTarget)
        }
        onMouseLeave={() => setAnchorEl(null)}
        onClick={onClick}
        size={size ?? 'medium'}
        sx={{ ...sxDefault, ...sx }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}>
        {icon ?? ''}
      </IconButton>
      {popover.length > 0 && (
        <Popover
          sx={{
            ...propsPopover,
            pointerEvents: 'none',
            background: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: vertical ?? 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          onClose={(event: MouseEvent<HTMLElement>) =>
            setAnchorEl(event.currentTarget)
          }
          disableRestoreFocus
          container={anchorEl}>
          <Typography sx={{ p: 1, fontSize: 12, color: 'text.primary' }}>
            {popover}
          </Typography>
        </Popover>
      )}
    </>
  )
}
