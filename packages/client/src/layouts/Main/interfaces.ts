import { User } from 'storeAuth/interfaces'

export interface DrawerHeaderProps {
  open?: boolean
  toggleDrawer: (check: boolean) => void
}

export interface SideBarProps {
  open?: boolean
}

export interface NanListItemProps {
  icon: JSX.Element
  text: string
  to: string
  isExpanded: boolean
}

export interface DataItemsProps {
  user: User
  open: boolean
}
