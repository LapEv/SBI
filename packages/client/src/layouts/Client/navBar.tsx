import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MuiAppBar from '@mui/material/AppBar'
import { menuData } from './drawerBarData'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

function NavItem({ text, ...rest }: { text: string; to: string }) {
  return (
    <Button
      color="inherit"
      component={Link}
      sx={{
        fontWeight: 'bold',
        fontSize: '0.975rem',
      }}
      {...rest}>
      {text}
    </Button>
  )
}

export const NavBar = () => {
  const AppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
    height: 60,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.complex,
    }),
  }))

  return (
    <AppBar position="fixed" sx={{ zIndex: 1, display: 'none' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            fontSize: '2.375rem',
          }}>
          SBI
        </Typography>
        {menuData.map(value => (
          <NavItem key={value.text} {...value} />
        ))}
      </Toolbar>
    </AppBar>
  )
}
