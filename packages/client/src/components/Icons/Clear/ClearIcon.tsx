import ClearIcon from '@mui/icons-material/Clear'
import { useTheme } from '@mui/material'

interface IClearIcon {
  size: string
}
export const ClearIconElement = ({ size }: IClearIcon) => {
  const theme = useTheme()

  return (
    <ClearIcon
      sx={{
        fontSize: size,
        color: theme.palette.mode === 'dark' ? '#1E515D' : '#C1EEE1',
      }}
    />
  )
}
