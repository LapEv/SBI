import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { useFullScreen } from 'hooks/useFullScreen'
import { Fab } from './Buttons/FloatingActionButton'
import ZoomInMap from '@mui/icons-material/ZoomInMap'
import ZoomOutMap from '@mui/icons-material/ZoomInMap'
import { memo, type PropsWithChildren } from 'react'
// import { ThemeButton } from './Buttons/ThemeButton'
import { useLocation } from 'react-router-dom'
import { Routes as Paths } from 'utils/routes'

const Screen = styled(Box)(() => ({
  '&::backdrop': {
    display: 'none',
  },
}))

export const FullScreen = memo(({ children }: PropsWithChildren) => {
  const [screenRef, fullScreen, toggleFullScreen] = useFullScreen()
  const state = useLocation()

  return (
    <Screen ref={screenRef}>
      {children}
      {state.pathname.slice(1) === Paths.Incidents ? (
        <Fab
          title={fullScreen ? 'Обычный режим' : 'Полноэкранный режим'}
          onClick={toggleFullScreen}
          active={fullScreen}>
          {fullScreen ? <ZoomInMap /> : <ZoomOutMap />}
        </Fab>
      ) : (
        <></>
      )}
      {/* <ThemeButton /> */}
    </Screen>
  )
})
