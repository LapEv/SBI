import {
  Main,
  Profile,
  ControlRoom,
  Users,
  Warehouse,
  Classifier,
  SLA,
} from 'layouts/Main/icons'
import { Routes } from 'utils/routes'
import Diversity3Icon from '@mui/icons-material/Diversity3'

export const menuData = [
  { text: 'Главная', icon: <Main />, to: Routes.Index, type: 'component' },
  {
    text: 'Диспетчерская',
    icon: <ControlRoom />,
    to: Routes.ControlRoom,
    type: 'menu',
  },
  {
    text: 'Склад',
    icon: <Warehouse />,
    to: Routes.Warehouse,
    type: 'component',
  },
  {
    text: 'Классификатор',
    icon: <Classifier />,
    to: Routes.Classifier,
    type: 'component',
  },
  {
    text: 'Пользователи',
    icon: <Users />,
    to: Routes.Users,
    type: 'component',
  },
  {
    text: 'Клиенты',
    icon: <Diversity3Icon />,
    to: Routes.Clients,
    type: 'component',
  },
  {
    text: 'Уровни сервиса',
    icon: <SLA />,
    to: Routes.ServiceLevel,
    type: 'component',
  },
  {
    text: 'Профиль',
    icon: <Profile />,
    to: `/${Routes.Profile}`,
    type: 'component',
  },
]

export const controlRoomMenuData = [
  { text: 'Заявки', icon: <ControlRoom />, to: Routes.Incidents },
  { text: 'Диспетчерская', icon: <ControlRoom />, to: Routes.IncidentsConfirm },
]

export const drawerWidth = 355
