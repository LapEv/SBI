import { Tooltip, useTheme, IconButton } from '@mui/material'
import { IconButtonTooltipProps } from './interfaces'
import { memo } from 'react'

export const IconToolTipButton = memo(
  ({ onClick, icon, size, sx, title }: IconButtonTooltipProps) => {
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
      <Tooltip
        title={title}
        PopperProps={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [50, 0],
              },
            },
          ],
        }}>
        <IconButton
          onClick={onClick}
          size={size ?? 'medium'}
          sx={{ ...sxDefault, ...sx }}>
          {icon ?? ''}
        </IconButton>
      </Tooltip>
    )
  }
)
