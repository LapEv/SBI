import { useStructure } from 'hooks/structure/useStructure'
import { memo, useEffect, useState } from 'react'
import { Box, ListItemText, ListItemButton } from '@mui/material'
import { Division } from 'store/slices/structure/interfaces'
import Collapse from '@mui/material/Collapse'
import { RotateButton } from 'components/Buttons'
import { classifier, classifierComponent } from 'static/styles'
import { DepartmentData } from './Department'

export const Divisions = memo(
  ({ divisionName, id_division, Departments }: Division) => {
    const [{ activeDivision }, { setActiveDivision }] = useStructure()
    const [open, setOpen] = useState(false)

    const handleClick = () => {
      setOpen(!open)
      setActiveDivision(id_division as string)
    }

    useEffect(() => {
      if (activeDivision !== id_division) {
        setOpen(false)
      }
    }, [activeDivision])

    return (
      <Box sx={classifier}>
        <ListItemButton
          divider={open}
          sx={classifierComponent}
          onClick={handleClick}>
          <ListItemText
            primary={divisionName}
            primaryTypographyProps={{ fontSize: '1.375rem!important' }}
          />
          <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
        </ListItemButton>
        <Collapse
          sx={{ width: '100%', height: 'auto' }}
          in={open}
          timeout="auto"
          unmountOnExit>
          {Departments?.map(({ departmentName, id, Users }) => (
            <DepartmentData
              departmentName={departmentName}
              id_department={id}
              key={id}
              Users={Users}
            />
          ))}
        </Collapse>
      </Box>
    )
  },
)
