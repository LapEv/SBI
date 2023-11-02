import {
  Main,
  Profile,
  ControlRoom,
  Users,
  Warehouse,
  Classifier,
} from 'layouts/Main/icons'
import { Routes } from 'utils/routes'
import Diversity3Icon from '@mui/icons-material/Diversity3'

export const menuData = [
  { text: 'Главная', icon: <Main />, to: Routes.Index },
  { text: 'Диспетчерская', icon: <ControlRoom />, to: Routes.ControlRoom },
  { text: 'Склад', icon: <Warehouse />, to: Routes.Warehouse },
  { text: 'Классификатор', icon: <Classifier />, to: Routes.Classifier },
  { text: 'Пользователи', icon: <Users />, to: Routes.Users },
  { text: 'Клиенты', icon: <Diversity3Icon />, to: Routes.Clients },
  { text: 'Профиль', icon: <Profile />, to: `/${Routes.Profile}` },
]

export const drawerWidth = 355
