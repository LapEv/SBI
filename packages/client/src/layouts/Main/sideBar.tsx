import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { menuData } from './drawerBarData'
import AvatarIcon from 'layouts/Main/icons/AvatarIcon'
import { Routes } from 'utils/routes'
import { useAuth } from 'hooks/useAuth'
import { LinkButton } from 'components/LinkButton'

interface SideBarProps {
  open?: boolean
}

interface NanListItemProps {
  icon: JSX.Element
  text: string
  to: string
  isExpanded: boolean
}

function NanListItem({ icon, text, to, isExpanded }: NanListItemProps) {
  return (
    <ListItem disablePadding sx={{ display: 'block', mt: 0.5 }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: isExpanded ? 'initial' : 'center',
          px: 2.5,
        }}
        component={Link}
        to={to}>
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isExpanded ? 3 : 'auto',
            justifyContent: 'center',
            // color: '#1E515D',
          }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={{ display: isExpanded ? 'block' : 'none' }}
        />
      </ListItemButton>
    </ListItem>
  )
}

export function SideBar({ open = false }: SideBarProps) {
  const [{ user }, { checkUser, signout }] = useAuth()

  console.log('Write change аватарка')

  const MUITypography = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    fontWeight: 'bold',
    fontSize: '2.375rem',
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
    height: 40,
    marginTop: 10,
    ...(open && {
      transition: theme.transitions.create('marginTop', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginTop: -70,
    }),
    ...(!open && {
      transition: theme.transitions.create('marginTop', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    }),
  }))

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <List>
      <Box
        component="div"
        sx={{
          width: '100%',
          height: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          mt: 0,
        }}>
        <MUITypography>SBI</MUITypography>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 150,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          mt: 2,
        }}>
        <Box
          sx={{
            width: open ? 100 : 50,
            height: open ? 100 : 50,
            background: '#DEF0EB',
            borderRadius: '50px',
            display: open ? 'flex' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: open ? 0 : 2,
          }}>
          <AvatarIcon
            sx={{ width: open ? 70 : 35, height: open ? 100 : 45 }}
            open={open}
          />
        </Box>
        <Typography sx={{ mt: open ? 1 : 0, height: 30 }}>
          {user ? user.firstName : ''}
        </Typography>

        <LinkButton
          onClick={() => user && signout()}
          sx={{ width: open ? '90%' : 40, mt: 1 }}
          to={`/${Routes.Login}`}>
          {user ? 'Выйти' : 'Войти'}
        </LinkButton>
      </Box>
      <Box
        component="div"
        sx={{
          mt: 3,
        }}>
        {menuData.map(value => (
          <NanListItem key={value.text} {...value} isExpanded={open} />
        ))}
      </Box>
    </List>
  )
}
