import { createContext, useMemo, useState } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { ThemeConfig } from './themeConfig'
import App from '../App'
import { useAuth } from 'hooks/auth/useAuth'
const defaultTheme =
  (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light'
// eslint-disable @typescript-eslint/no-empty-function
export const ColorModeContext = createContext({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  toggleColorMode: (id: string | undefined) => {},
})
/* eslint-enable @typescript-eslint/no-empty-function */

export default function ToggleColorMode() {
  const [mode, setMode] = useState<'light' | 'dark'>(defaultTheme)
  const [{ user }, { changeThemeOnServer }] = useAuth()
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const colorMode = useMemo(
    () => ({
      toggleColorMode: (id: string | undefined) => {
        setMode(prevMode => {
          const theme = prevMode === 'light' ? 'dark' : 'light'
          localStorage.setItem('theme', theme)
          if (id) {
            changeThemeOnServer({
              id: id,
              theme: prevMode === 'light' ? 'dark' : 'light',
            })
          }
          return theme
        })
      },
    }),
    []
  )

  const theme = useMemo(() => createTheme(ThemeConfig(mode)), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
