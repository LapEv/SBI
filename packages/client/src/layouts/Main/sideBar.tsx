import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from '@mui/material'
import { menuData } from './drawerBarData'
import { Avatar } from 'layouts/Main/icons/Avatar'
import { Routes } from 'utils/routes'
import { useAuth } from 'hooks/auth/useAuth'
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

  useEffect(() => {
    checkUser()
  }, [])

  const MUITypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '1.975rem',
    zIndex: 1,
    backgroundColor: theme.palette.background.default,
  }))

  return (
    <List>
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
        {!open ? <MUITypography>SBI</MUITypography> : <></>}

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
          <Avatar
            sx={{ width: open ? 70 : 35, height: open ? 100 : 45 }}
            open={open}
          />
        </Box>
        <Typography
          sx={{
            mt: open ? 1 : 0,
            height: 30,
            display: open ? 'flex' : 'none',
          }}>
          {user ? user.firstName : ''}
        </Typography>
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
      <Box
        sx={{
          width: '100%',
          height: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          mt: 0,
        }}>
        <LinkButton
          onClick={() => user && signout()}
          sx={{ width: '90%', mt: 10, display: open ? 'flex' : 'none' }}
          to={`/${Routes.Login}`}>
          {user ? 'Выйти' : 'Войти'}
        </LinkButton>
      </Box>
    </List>
  )
}
