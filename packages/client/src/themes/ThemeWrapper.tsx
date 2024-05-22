import { useEffect, useMemo, useState } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { ThemeColor, ThemeConfig } from './themeConfig'
import App from '../App'
import { useAuth } from 'hooks/auth/useAuth'

export default function ToggleColorMode() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [fontSize, setFontSize] = useState<string>('large')
  const [colorLight, setColorLight] = useState<string>(ThemeColor.light)
  const [colorDark, setColorDark] = useState<string>(ThemeColor.dark)

  const [{ user }] = useAuth()

  useEffect(() => {
    setMode(user.appOptions?.theme ?? 'light')
  }, [user.appOptions?.theme])

  useEffect(() => {
    setFontSize(user.appOptions?.font ?? 'large')
  }, [user.appOptions?.font])

  useEffect(() => {
    setColorLight(user.appOptions?.color_Light ?? '#1E515D')
  }, [user.appOptions?.color_Light])

  useEffect(() => {
    setColorDark(user.appOptions?.color_Dark ?? '#C1EEE1')
  }, [user.appOptions?.color_Dark])

  const theme = useMemo(
    () => createTheme(ThemeConfig({ mode, fontSize, colorLight, colorDark })),
    [mode, fontSize],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}
