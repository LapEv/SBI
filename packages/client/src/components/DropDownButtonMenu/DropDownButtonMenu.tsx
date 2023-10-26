import { useState, MouseEvent } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import { Box, useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

interface DropDownMenuProps {
  popover: string
  data: {
    name: string
    title: string
    icon?: JSX.Element
  }[]
  divider?: number[]
  onClick: (name: string | null) => void
}
export const DropDownMenu = ({
  popover,
  data,
  divider,
  onClick,
}: DropDownMenuProps) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorMenuEl)

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorMenuEl(event.currentTarget)
  }

  const handleClose = (name: string | null) => {
    setAnchorMenuEl(null)
    onClick(name)
  }

  return (
    <>
      <Box
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}>
        <IconButton
          onClick={handleClick}
          size="large"
          sx={{
            m: 1,
            width: 40,
            height: 40,
            borderRadius: '20%',
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            boxShadow: 5,
          }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
      {popover.length > 0 && (
        <Popover
          sx={{
            pointerEvents: 'none',
            background: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
          container={anchorEl}>
          <Typography sx={{ p: 1, fontSize: 12, color: 'text.primary' }}>
            {popover}
          </Typography>
        </Popover>
      )}
      <Menu
        anchorEl={anchorMenuEl}
        id="DropDownMenu"
        open={openMenu}
        onClose={() => handleClose(null)}
        onClick={() => handleClose(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            bgcolor: theme.palette.background.paper,
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.secondary',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {data.map(({ name, title, icon }, index) => (
          <Box key={`${name}${index}`}>
            <MenuItem onClick={() => handleClose(name)}>
              <ListItemIcon sx={{ color: theme.palette.background.default }}>
                {icon}
              </ListItemIcon>
              {title}
            </MenuItem>
            {divider?.includes(index + 1) && <Divider />}
          </Box>
        ))}
      </Menu>
    </>
  )
}
