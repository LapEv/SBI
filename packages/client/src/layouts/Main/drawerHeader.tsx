import { FC } from 'react'
import { styled } from '@mui/material/styles'
import { IconButton, Typography, Box } from '@mui/material'
import { LeftArrow, RightArrow } from 'layouts/Main/icons'

interface SideBarProps {
  open?: boolean
  toggleDrawer: (check: boolean) => void
}

export const DrawerHeader: FC<SideBarProps> = ({ open, toggleDrawer }) => {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }))

  const MUITypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '1.975rem',
    zIndex: 1,
    backgroundColor: theme.palette.background.default,
  }))

  return (
    <DrawerHeader
      sx={{
        minWidth: '100%',
        mt: 0,
        minHeight: '59.5px!important',
        zIndex: 1,
        boxShadow: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pl: open ? 2 : 1,
        pr: 2,
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {open ? <MUITypography>SBI</MUITypography> : <></>}
      </Box>

      <IconButton onClick={() => toggleDrawer(!open)}>
        {open ? <LeftArrow /> : <RightArrow />}
      </IconButton>
    </DrawerHeader>
  )
}
