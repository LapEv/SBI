import { Box, Collapse, ListItemButton, ListItemText } from '@mui/material'
import { RotateButton } from 'components/Buttons'
import { memo, useState } from 'react'
import { listItemButton } from 'static/styles/listItemButton'
import { SwitchMUI } from 'components/Switch'
import { useAuth } from 'hooks/auth/useAuth'
import { ThemeMode } from 'storeAuth/interfaces'

export const ProfileAppOptions = memo(() => {
  const [{ user }, { changeUserAppOptions }] = useAuth()
  const [open, setOpen] = useState<boolean>(false)
  const [theme, setTheme] = useState<boolean>(
    user.appOptions?.theme === 'light' ? false : true,
  )
  const [font, setFont] = useState<boolean>(
    user.appOptions?.font === 'large' ? false : true,
  )

  const handleClick = () => {
    console.log('handleClick')
    setOpen(!open)
  }

  const handleChangeTheme = () => {
    setTheme(!theme)
    const appOptions = {
      ...user.appOptions,
      theme: (theme ? 'light' : 'dark') as ThemeMode,
    }
    changeUserAppOptions({ id: user.id as string, appOptions })
  }

  const handleChangeFont = () => {
    setFont(!font)
    const appOptions = { ...user.appOptions, font: font ? 'large' : 'small' }
    changeUserAppOptions({ id: user.id as string, appOptions })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        mt: 2,
      }}>
      <ListItemButton divider={open} sx={listItemButton} onClick={handleClick}>
        <>
          <ListItemText
            primary={'Настройки приложения'}
            primaryTypographyProps={{ fontSize: '1rem!important' }}
          />
          <RotateButton open={open} handleClick={handleClick} size={'1.5rem'} />
        </>
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', mt: 2 }}
        in={open}
        timeout="auto"
        unmountOnExit>
        <SwitchMUI
          label={`Тема ${theme ? 'тёмная' : 'светлая'}`}
          onChange={handleChangeTheme}
          checked={theme}
          value={theme}
        />
        <SwitchMUI
          label={`Значки ${font ? 'маленькие' : 'большие'}`}
          onChange={handleChangeFont}
          checked={font}
          value={font}
        />
      </Collapse>
    </Box>
  )
})
