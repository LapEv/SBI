import { styled } from '@mui/material/styles'
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress'

export const BorderLinearProgress = styled(LinearProgress)(
  ({ theme, value }) => (
    console.log('value = ', value),
    {
      height: 15,
      borderRadius: 5,
      [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
          theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800],
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        // backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
        backgroundColor:
          (value as number) >= 100
            ? '#ff2c2c'
            : (value as number) >= 75
            ? '#f1a605'
            : (value as number) >= 50
            ? '#daf105'
            : '#16f105',
      },
    }
  )
)
