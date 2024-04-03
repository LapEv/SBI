import { createContext, useMemo, useState } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { ThemeConfig } from './themeConfig'
import App from '../App'
import { useAuth } from 'hooks/auth/useAuth'

const localStorageTheme =
  typeof window !== 'undefined'
    ? (localStorage.getItem('theme') as 'light' | 'dark')
    : 'light'
const defaultTheme = localStorageTheme ?? 'light'

export const ColorModeContext = createContext({
  toggleColorMode: (id: string | undefined) => {
    id
  },
})

export default function ToggleColorMode() {
  const [mode, setMode] = useState<'light' | 'dark'>(defaultTheme)
  const [, { changeThemeOnServer }] = useAuth()

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
