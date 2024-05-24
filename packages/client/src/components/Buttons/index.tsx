import MuiButton, { type ButtonProps } from '@mui/material/Button'
import {
  ElementType,
  ForwardRefExoticComponent,
  RefAttributes,
  memo,
} from 'react'
import { LinkProps } from 'react-router-dom'

type TButtonProps = Omit<ButtonProps, 'component'> & {
  component?:
    | React.ForwardRefExoticComponent<
        LinkProps & React.RefAttributes<HTMLAnchorElement>
      >
    /* eslint-disable @typescript-eslint/no-explicit-any */
    | ElementType<any>
    /* eslint-enable @typescript-eslint/no-explicit-any */
    | ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>
}

export const Button = memo((props: TButtonProps) => {
  const { sx, ...otherprops } = props

  const sxprops = {
    fontWeight: 700,
    color: '#000000',
    ...sx,
  }
  return <MuiButton variant="contained" sx={sxprops} {...otherprops} />
})

export { ButtonsSection } from './ButtonsSection'
export { ButtonsModalSection } from './ButtonsModalSection'
export { ButtonsSectionNoSubmit } from './ButtonsSectionNoSubmit'
export { RotateButton } from './RotateButton'
export { EditButton } from './EditButton'
export { IconPopoverButton } from './IconPopoverButton'
export { IconToolTipButton } from './IconToolTipButton'
