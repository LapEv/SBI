import IconButton from '@mui/material/IconButton'
import ExpandLess from '@mui/icons-material/ExpandLess'
import { userRotateStyles } from '../../themes/rotateConfig'

interface IRotateButton {
  open: boolean
  handleClick?: () => void
  size: string
}
export const RotateButton = ({ open, handleClick, size }: IRotateButton) => {
  const classes = userRotateStyles()

  return (
    <IconButton
      className={`${classes.iconButton} ${open ? 'expanded' : ''}`}
      onClick={handleClick}>
      <ExpandLess sx={{ fontSize: size }} />
    </IconButton>
  )
}
