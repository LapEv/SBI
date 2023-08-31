import Main from 'layouts/Main/icons/Main'
import ProfileIcon from 'layouts/Main/icons/Profile'
import { Routes } from 'utils/routes'

export const menuData = [
  { text: 'Главная', icon: <Main />, to: Routes.Index },
  { text: 'Профиль', icon: <ProfileIcon />, to: `/${Routes.Profile}` },
]

export const drawerWidth = 355
