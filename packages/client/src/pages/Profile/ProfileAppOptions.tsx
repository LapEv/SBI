import {
  Box,
  Collapse,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { RotateButton } from 'components/Buttons'
import { memo, useState } from 'react'
import { listItemButton } from 'static/styles/listItemButton'
import { SwitchMUI } from 'components/Switch'
import { useAuth } from 'hooks/auth/useAuth'
import { ThemeMode } from 'storeAuth/interfaces'
import ColorPicker from 'mui-color-picker'

export const ProfileAppOptions = memo(() => {
  const [{ user, colorTheme }, { changeUserAppOptions, changeColorTheme }] =
    useAuth()
  const [open, setOpen] = useState<boolean>(false)
  const [theme, setTheme] = useState<boolean>(
    user.appOptions?.theme === 'light' ? false : true,
  )
  const [font, setFont] = useState<boolean>(
    user.appOptions?.font === 'large' ? false : true,
  )

  // const [colorLight, setColorLight] = useState<string>(ThemeColor.light)
  // const [colorDark, setColorDark] = useState<string>(ThemeColor.dark)

  const handleClick = () => {
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

  const handleChangeColorLight = (colorLight: string) => {
    if (!colorLight) return
    changeColorTheme({ ...colorTheme, colorLight })
    // const appOptions = { ...user.appOptions, color_Light }
    // changeUserAppOptions({ id: user.id as string, appOptions })
  }

  const handleChangeColorDark = (colorDark: string) => {
    if (!colorDark) return
    changeColorTheme({ ...colorTheme, colorDark })
    // const appOptions = { ...user.appOptions, color_Dark }
    // changeUserAppOptions({ id: user.id as string, appOptions })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
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
        <Box
          sx={{
            ml: 4,
            mt: 2,
            justifyContent: 'space-between',
            width: '85%',
          }}>
          <Typography variant="body1">Цвет светлой темы</Typography>
          <ColorPicker
            sx={{ mt: 1 }}
            name="color"
            defaultValue={colorTheme.colorLight}
            onChange={handleChangeColorLight}
          />
        </Box>
        <Box
          sx={{
            ml: 4,
            mt: 2,
            justifyContent: 'space-between',
            width: '85%',
          }}>
          <Typography variant="body1">Цвет темной темы</Typography>
          <ColorPicker
            sx={{ mt: 1 }}
            name="color"
            defaultValue={colorTheme.colorDark}
            onChange={handleChangeColorDark}
          />
        </Box>
      </Collapse>
    </Box>
  )
})
