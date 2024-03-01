export interface DropDownMenuProps {
  popover: string
  data: {
    name: string
    title: string
    icon?: JSX.Element
  }[]
  divider?: number[]
  onClick: (name: string | null) => void
  vertical?: 'top' | 'center' | 'bottom' | number
  icon?: JSX.Element
  sx?: any
}

export interface DropDownMenuTooltipProps {
  title: string
  data: {
    name: string
    title: string
    icon?: JSX.Element
  }[]
  divider?: number[]
  onClick: (name: string | null) => void
  icon?: JSX.Element
  sx?: any
}
