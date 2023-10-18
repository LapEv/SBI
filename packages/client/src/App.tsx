import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from 'components/ErrorBoundary'
import './App.css'
import { FullScreen } from 'components/FullScreen'
import * as Pages from 'pages'
import * as Layouts from 'layouts'
import { Routes as Paths } from 'utils/routes'
import { RequiredAuth } from 'hoks/RequiredAuth'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { useRoles } from 'hooks/roles/useRoles'
import { useStructure } from 'hooks/structure/useStructure'

function App() {
  const [{ isLoadingAuth, user }] = useAuth()
  const [{ isLoadingRoles }] = useRoles()
  const [{ isLoadingStructure }] = useStructure()
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }
    fetchServerData()
  }, [])

  return (
    <FullScreen>
      <BrowserRouter>
        <ErrorBoundary>
          <div className="App" data-testid="App">
            {(isLoadingAuth || isLoadingRoles || isLoadingStructure) && (
              <Box
                sx={{
                  width: '100%',
                  minHeight: '100vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1999,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  position: 'absolute',
                }}>
                <CircularProgress />
              </Box>
            )}
            <Routes>
              <Route path={Paths.Index} element={<Layouts.Main />}>
                <Route
                  index
                  element={user ? <Pages.Home /> : <Pages.Login />}
                />
                <Route path={Paths.Login} element={<Pages.Login />} />
                <Route
                  path={Paths.Profile}
                  element={
                    <RequiredAuth>
                      <Pages.Profile />
                    </RequiredAuth>
                  }
                />
                <Route
                  path={Paths.ControlRoom}
                  element={
                    <RequiredAuth>
                      <Pages.ControlRoom />
                    </RequiredAuth>
                  }
                />
                <Route
                  path={Paths.Warehouse}
                  element={
                    <RequiredAuth>
                      <Pages.Warehouse />
                    </RequiredAuth>
                  }
                />
                <Route
                  path={Paths.Users}
                  element={
                    <RequiredAuth>
                      <Pages.Users />
                    </RequiredAuth>
                  }
                />
              </Route>
              <Route path={Paths.NotFounde} element={<Pages.Error />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </FullScreen>
  )
}

export default App
