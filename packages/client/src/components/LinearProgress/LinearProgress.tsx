import { styled } from '@mui/material/styles'
import LinearProgress, {
  LinearProgressProps,
  linearProgressClasses,
} from '@mui/material/LinearProgress'
import { Typography, Box } from '@mui/material'

export const StyledLinearProgress = styled(LinearProgress)(
  ({ theme, value }) => ({
    height: 15,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor:
        (value as number) >= 95
          ? '#ff2c2c'
          : (value as number) >= 75
          ? '#f1a605'
          : (value as number) >= 50
          ? '#daf105'
          : '#16f105',
    },
  })
)

export const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <StyledLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.floor(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}
