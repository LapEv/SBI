import FormControlLabel from '@mui/material/FormControlLabel'
import { ISwitchMUI } from './interfaces'
import { Switch, styled } from '@mui/material'
import { memo } from 'react'
import { ThemeMode } from 'themes/themeConfig'

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '.MuiSwitch-track': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? '#7fa99d!important'
        : '#9ed3c4!important',
  },
  '.Mui-checked+.MuiSwitch-track': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? '#033f17!important'
        : '#179b75!important',
  },
  '&.MuiTableCell-head, .MuiTableCell-paddingNone': {
    padding: '5px!important',
  },
}))

const CustomFormControl = styled(FormControlLabel)(({ theme }) => ({
  '&.MuiFormControlLabel-root': {
    color: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

export const SwitchMUI = memo(({ label, checked, onChange }: ISwitchMUI) => {
  return (
    <CustomFormControl
      control={
        <CustomSwitch
          checked={checked}
          onChange={({ target }) => onChange(target.checked)}
        />
      }
      label={label}
      labelPlacement="start"
    />
  )
})
