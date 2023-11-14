import { SyntheticEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'

interface IEditButton {
  handleClick?: (event: SyntheticEvent<EventTarget>) => void
  size: string
}
export const EditButton = ({ handleClick, size }: IEditButton) => {
  return (
    <IconButton onClick={handleClick}>
      <EditIcon sx={{ fontSize: size }} />
    </IconButton>
  )
}
