import { Popover as MuiPopover, styled } from '@mui/material'
import { ThemeMode } from '../../themes/themeConfig'
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'

const StyledPopover = styled(MuiPopover)(({ theme }) => ({
  // '&.MuiPopover-root': {
  //   backgroundColor: 'rgba(0,0,0,0)',
  // },
  // '&.MuiPopover-paper': {
  //   backgroundColor: 'rgba(0,0,0,0)',
  // },
  // '.MuiPaper-root': {
  //   backgroundColor: 'rgba(0,0,0,0)',
  // },
}))

export const PopoverINC = (props: any) => {
  return (
    <ThemeProvider
      theme={(theme: Theme) =>
        createTheme({
          ...theme,
          components: {
            ...theme.components,
            MuiPopover: {
              styleOverrides: {
                paper: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderRadius: 5,
                  boxShadow: 'none',
                  marginTop: 27,
                },
              },
            },
          },
        })
      }>
      <StyledPopover {...props} />
    </ThemeProvider>
  )
}
