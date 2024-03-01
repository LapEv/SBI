import { useState } from 'react'
import { Tooltip, useTheme, IconButton } from '@mui/material'

interface IconButtonProps {
  onClick: () => void
  icon?: JSX.Element
  sx?: any
  size?: 'small' | 'medium' | 'large'
  title: string
}

export function IconToolTipButton({
  onClick,
  icon,
  size,
  sx,
  title,
}: IconButtonProps) {
  const theme = useTheme()

  const sxDefault = {
    m: 1,
    width: 40,
    height: 40,
    borderRadius: '20%',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    boxShadow: 5,
  }

  return (
    <Tooltip title={title}>
      <IconButton
        onClick={onClick}
        size={size ?? 'medium'}
        sx={{ ...sxDefault, ...sx }}>
        {icon ?? ''}
      </IconButton>
    </Tooltip>
  )
}
