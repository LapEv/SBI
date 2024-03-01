import { useState, MouseEvent } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import { Box, Tooltip, useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'

interface DropDownMenuProps {
  title: string
  data: {
    name: string
    title: string
    icon?: JSX.Element
  }[]
  divider?: number[]
  onClick: (name: string | null) => void
  icon?: JSX.Element
  sx?: any
}

export const DropDownMenuToolTip = ({
  title,
  data,
  divider,
  onClick,
  icon,
  sx,
}: DropDownMenuProps) => {
  const theme = useTheme()
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorMenuEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorMenuEl(event.currentTarget)
  }

  const handleClose = (name: string | null) => {
    setAnchorMenuEl(null)
    onClick(name)
  }

  return (
    <>
      <Tooltip
        title={title}
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
            ...sx,
          }}>
          {icon ?? <MenuIcon />}
        </IconButton>
      </Tooltip>
      <Menu
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
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
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
