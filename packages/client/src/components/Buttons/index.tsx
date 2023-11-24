import MuiButton, { type ButtonProps } from '@mui/material/Button'

//https://github.com/mui/material-ui/issues/16846
type TButtonProps = Omit<ButtonProps, 'component'> & { component?: any } // eslint-disable-line @typescript-eslint/no-explicit-any

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
