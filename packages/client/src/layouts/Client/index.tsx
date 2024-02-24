import { useState } from 'react'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import { Box, Divider, Drawer as MuiDrawer, useTheme } from '@mui/material'
import { NavBar } from '../Main/navBar'
import { SideBar } from '../Main/sideBar'
import { drawerWidth } from '../Main/drawerBarData'
import { DrawerHeader } from '../Main/drawerHeader'
import { Outlet } from 'react-router-dom'

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.complex,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.complex,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export const ClientLayout = () => {
  const theme = useTheme()
  const [open, setOpen] = useState<boolean>(true)
  const toggleDrawer = () => {
    setOpen(prev => !prev)
  }

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <NavBar />
      <Drawer
        sx={{ display: { xs: 'flex', md: 'flex' } }}
        variant="permanent"
        open={open}>
        <DrawerHeader open={open} toggleDrawer={toggleDrawer} />
        <Divider />
        <SideBar open={open} />
      </Drawer>
      <Box
        sx={{
          width: open
            ? `calc(100% - ${drawerWidth}px)`
            : `calc(100% - ${theme.spacing(8)} - 1px)`,
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 0,
        }}>
        <Outlet />
      </Box>
    </Box>
  )
}
