import { useTheme } from '@mui/material'
import { memo, useContext } from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useAuth } from 'hooks/auth/useAuth'
import { Fab } from './FloatingActionButton'
import { ColorModeContext } from 'themes/ThemeWrapper'

export const ThemeButton = memo(() => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const [{ user }] = useAuth()
  return (
    <Fab
      title={'Переключить тему'}
      onClick={() => colorMode.toggleColorMode(user?.id)}
      order={1}>
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </Fab>
  )
})
