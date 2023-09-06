import { FC } from 'react'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import LeftArrow from 'layouts/Main/icons/LeftArrow'
import RightArrow from 'layouts/Main/icons/RightArrow'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

interface SideBarProps {
  open?: boolean
  toggleDrawer: () => void
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
        border: '3px solid #1E515D',
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

      <IconButton onClick={toggleDrawer}>
        {open ? <LeftArrow /> : <RightArrow />}
      </IconButton>
    </DrawerHeader>
  )
}
