import { Box } from '@mui/material'
import { AvatarBox } from 'components/AvatarBox'
import { ProfileHeaderProps } from './interfaces'
import { memo } from 'react'

export const ProfileHeader = memo(
  ({ onChooseFile, fileData, avatar }: ProfileHeaderProps) => {
    return (
      <Box component="header">
        <label>
          <AvatarBox
            src={(fileData ?? `${avatar}`) as string}
            sx={{
              width: '100px',
              height: '100px',
              bgcolor: '#1E515D',
              cursor: 'pointer',
            }}
          />
          <input
            accept="image/*"
            type="file"
            style={{ display: 'none' }}
            onChange={onChooseFile}
          />
        </label>
      </Box>
    )
  }
)
