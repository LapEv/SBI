import { useEffect, useRef, useState } from 'react'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import { Box, Divider, Drawer as MuiDrawer, useTheme } from '@mui/material'
import { NavBar } from './navBar'
import { SideBar } from './sideBar'
import { drawerWidth } from './drawerBarData'
import { DrawerHeader } from './drawerHeader'
import { Outlet } from 'react-router-dom'
import { useAuth } from 'hooks/auth/useAuth'
import { useApp } from 'hooks/app/useApp'

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

export const MainLayout = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const [_, { setDataWidth }] = useApp()
  const theme = useTheme()
  const [open, setOpen] = useState<boolean>(true)
  const [width, setWidth] = useState<string>(`calc(100% - ${drawerWidth}px)`)
  const toggleDrawer = (check: boolean) => {
    setOpen(prev => !prev)
    const widthCheck = check
      ? `calc(100% - ${drawerWidth}px)`
      : `calc(100% - ${theme.spacing(8)} - 1px)`
    setWidth(widthCheck)
    setTimeout(() => {
      setDataWidth(boxRef.current!.clientWidth)
    }, 100)
  }
  const [{ user }] = useAuth()

  useEffect(() => {
    setTimeout(() => {
      setDataWidth(boxRef.current!.offsetWidth)
    }, 100)
  }, [])

  return (
    // <>
    //   {user && user.status ? (
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
        ref={boxRef}
        sx={{
          width,
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 0,
        }}>
        <Outlet />
      </Box>
    </Box>
    //   ) : (
    //     <Box
    //       ref={boxRef}
    //       sx={{
    //         display: 'flex',
    //         width: '100%',
    //         height: '100vH',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}>
    //       <Outlet />
    //     </Box>
    //   )}
    // </>
  )
}
