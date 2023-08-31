import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { useFullScreen } from 'hooks/useFullScreen'
import { Fab } from './Buttons/FloatingActionButton'
import ZoomInMap from '@mui/icons-material/ZoomInMap'
import ZoomOutMap from '@mui/icons-material/ZoomInMap'
import { type PropsWithChildren } from 'react'
import { ThemeButton } from './Buttons/ThemeButton'

const Screen = styled(Box)(() => ({
  '&::backdrop': {
    display: 'none',
  },
}))

export function FullScreen({ children }: PropsWithChildren) {
  const [screenRef, fullScreen, toggleFullScreen] = useFullScreen()

  return (
    <Screen ref={screenRef}>
      {children}
      <Fab
        title={fullScreen ? 'Обычный режим' : 'Полноэкранный режим'}
        onClick={toggleFullScreen}
        active={fullScreen}>
        {fullScreen ? <ZoomInMap /> : <ZoomOutMap />}
      </Fab>
      <ThemeButton />
    </Screen>
  )
}
