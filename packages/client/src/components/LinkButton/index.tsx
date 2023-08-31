import { ButtonProps } from '@mui/material'
import { Button } from 'components/Buttons'
import { Link, LinkProps } from 'react-router-dom'

export function LinkButton(props: ButtonProps & LinkProps) {
  return <Button component={Link} {...props} />
}
