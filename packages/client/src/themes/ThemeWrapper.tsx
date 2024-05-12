import { useEffect, useMemo, useState } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { ThemeConfig } from './themeConfig'
import App from '../App'
import { useAuth } from 'hooks/auth/useAuth'

export default function ToggleColorMode() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [fontSize, setFontSize] = useState<string>('large')
  const [{ user }] = useAuth()

  useEffect(() => {
    setMode(user.appOptions?.theme ?? 'light')
  }, [user.appOptions?.theme])

  useEffect(() => {
    setFontSize(user.appOptions?.font ?? 'large')
  }, [user.appOptions?.font])

  const theme = useMemo(
    () => createTheme(ThemeConfig({ mode, fontSize })),
    [mode, fontSize],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}
