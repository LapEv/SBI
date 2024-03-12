import MuiButton, { type ButtonProps } from '@mui/material/Button'

type TButtonProps = Omit<ButtonProps, 'component'> & {
  component?: Record<string, unknown>
}

export function Button(props: TButtonProps) {
  return (
    <MuiButton
      variant="contained"
      sx={{ fontWeight: 700, minWidth: 270 }}
      {...props}
    />
  )
}

export { ButtonsSection } from './ButtonsSection'
export { ButtonsModalSection } from './ButtonsModalSection'
export { ButtonsSectionNoSubmit } from './ButtonsSectionNoSubmit'
export { RotateButton } from './RotateButton'
export { ThemeButton } from './ThemeButton'
export { EditButton } from './EditButton'
export { IconPopoverButton } from './IconPopoverButton'
export { IconToolTipButton } from './IconToolTipButton'
