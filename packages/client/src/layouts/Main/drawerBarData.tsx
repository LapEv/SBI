import Main from 'layouts/Main/icons/Main'
import ProfileIcon from 'layouts/Main/icons/Profile'
import { Routes } from 'utils/routes'
import { ControlRoom } from './icons/ControlRoom'
import { Users } from './icons/Users'
import { Warehouse } from './icons/Warehouse'
import Diversity3Icon from '@mui/icons-material/Diversity3'

export const menuData = [
  { text: 'Главная', icon: <Main />, to: Routes.Index },
  { text: 'Диспетчерская', icon: <ControlRoom />, to: Routes.ControlRoom },
  { text: 'Склад', icon: <Warehouse />, to: Routes.Warehouse },
  { text: 'Пользователи', icon: <Users />, to: Routes.Users },
  { text: 'Клиенты', icon: <Diversity3Icon />, to: Routes.Clients },
  { text: 'Профиль', icon: <ProfileIcon />, to: `/${Routes.Profile}` },
]

export const drawerWidth = 355
