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
console.log('Client start defaultTheme = ', defaultTheme)

export const ColorModeContext = createContext({
  toggleColorMode: (id: string | undefined) => {
    id
  },
})

export default function ToggleColorMode() {
  const [mode, setMode] = useState<'light' | 'dark'>(defaultTheme)
  const [, { changeThemeOnServer }] = useAuth()
  console.log('Client defaultTheme = ', defaultTheme)
  console.log('Client mode = ', mode)

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
    [],
  )
  console.log('Client colorMode = ', colorMode)

  const theme = useMemo(() => createTheme(ThemeConfig(mode)), [mode])

  console.log('Client theme = ', theme)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
