import { memo, useState } from 'react'
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
  Collapse,
} from '@mui/material'
import {
  DispatcherData,
  FieldEngineersData,
  OtherData,
  clientData,
  controlRoomMenuData,
  menuData,
} from './drawerBarData'
import { Avatar } from 'layouts/Main/icons/Avatar'
import { Routes } from 'utils/routes'
import { useAuth } from 'hooks/auth/useAuth'
import { LinkButton } from 'components/LinkButton'
import { RotateButton } from 'components/Buttons'
import { DataItemsProps, NanListItemProps, SideBarProps } from './interfaces'

const ControlRoomListItem = memo(
  ({ icon, text, to, isExpanded }: NanListItemProps) => {
    return (
      <ListItem disablePadding sx={{ display: 'block', ml: 2 }}>
        <ListItemButton
          sx={{
            minHeight: 24,
            justifyContent: isExpanded ? 'initial' : 'center',
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
  },
)

const NanListItem = memo(({ icon, text, to, isExpanded }: NanListItemProps) => {
  const [openControl, setOpenControl] = useState<boolean>(false)

  return (
    <>
      {text === 'Диспетчерская' ? (
        <Box sx={{ display: 'block', mt: 0.5, ml: 0.5 }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: isExpanded ? 'initial' : 'center',
            }}
            onClick={() => setOpenControl(!openControl)}>
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
            <RotateButton
              open={openControl}
              handleClick={() => setOpenControl(!openControl)}
              size={'1.5rem'}
            />
          </ListItemButton>
          <Collapse
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              ml: -1,
            }}
            in={openControl}
            timeout="auto"
            unmountOnExit>
            {controlRoomMenuData.map(value => (
              <ControlRoomListItem
                key={value.text}
                {...value}
                isExpanded={openControl}
              />
            ))}
          </Collapse>
        </Box>
      ) : (
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
      )}
    </>
  )
})

const DataItems = memo(({ user, open }: DataItemsProps) => {
  if (
    user &&
    user.status === 'employee' &&
    user.RolesGroup?.group === 'Dispatcher'
  ) {
    return (
      <>
        {DispatcherData.map(value => (
          <NanListItem key={value.text} {...value} isExpanded={open} />
        ))}
      </>
    )
  }
  if (
    user &&
    user.status === 'employee' &&
    user.RolesGroup?.group === 'FieldEngineers'
  ) {
    return (
      <>
        {FieldEngineersData.map(value => (
          <NanListItem key={value.text} {...value} isExpanded={open} />
        ))}
      </>
    )
  }
  if (
    user &&
    user.status === 'employee' &&
    (user.RolesGroup?.group === 'ADMIN' ||
      user.RolesGroup?.group === 'SUPERADMIN')
  ) {
    return (
      <>
        {menuData.map(value => (
          <NanListItem key={value.text} {...value} isExpanded={open} />
        ))}
      </>
    )
  }
  if (user && user.status === 'client') {
    return (
      <>
        {clientData.map(value => (
          <NanListItem key={value.text} {...value} isExpanded={open} />
        ))}
      </>
    )
  }
  return (
    <>
      {OtherData.map(value => (
        <NanListItem key={value.text} {...value} isExpanded={open} />
      ))}
    </>
  )
})

export const SideBar = memo(({ open = false }: SideBarProps) => {
  const [{ user }, { signout }] = useAuth()

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
        <DataItems user={user} open={open} />
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
})
