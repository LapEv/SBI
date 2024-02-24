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
import ListAltIcon from '@mui/icons-material/ListAlt'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'

export const menuData = [
  { text: 'Главная', icon: <Main />, to: Routes.Index, type: 'component' },
  {
    text: 'Оставить заявку',
    icon: <ControlRoom />,
    to: Routes.ClientAddINC,
    type: 'component',
  },
  {
    text: 'Статуст инцидента',
    icon: <Warehouse />,
    to: Routes.CheckINC,
    type: 'component',
  },
  {
    text: 'Написать',
    icon: <Classifier />,
    to: Routes.toTechSupport,
    type: 'component',
  },
]

export const drawerWidth = 355
