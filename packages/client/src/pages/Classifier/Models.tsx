import { useEffect, useState, memo } from 'react'
import { Box, ListItemText, ListItemButton } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { RotateButton } from 'components/Buttons'
import { ClassifierModels } from 'store/slices/classifier/interfaces'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { classifierChildComponent, flexColumn_FS_SA } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { DataList } from 'components/CheckBoxGroup/interface'

export const Models = memo(({ model, id_equipment, id }: ClassifierModels) => {
  const [
    { activeModel, typicalMalfunctions },
    { setActiveModel, getTypicalMalfunctionsById },
  ] = useClassifier()
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<DataList[]>([])

  const handleClick = () => {
    if (!open) {
      getTypicalMalfunctionsById(id_equipment)
      setActiveModel(id as string)
    }
    setOpen(!open)
    setData(
      typicalMalfunctions.map(item => {
        return {
          name: item.typicalMalfunction,
          id: item.id as string,
          initChecked: item.models.includes(id as string),
        }
      })
    )
  }

  const onChooseItems = (checked: boolean, id: string) => {
    // if (!checked) {
    //   setSelectedRoles(selectedRoles.filter(value => value !== id))
    //   return
    // }
    // setSelectedRoles([...selectedRoles, id])
    // if ([...selectedRoles, id] && errSelectedItems) setErrSelectedItems(false)
  }

  useEffect(() => {
    if (activeModel !== id) {
      setOpen(false)
    }
  }, [activeModel])

  return (
    <Box sx={flexColumn_FS_SA}>
      <ListItemButton
        divider={open}
        sx={classifierChildComponent}
        onClick={handleClick}>
        <ListItemText
          primary={model}
          sx={{ ml: 2 }}
          primaryTypographyProps={{ fontSize: '1.175rem!important' }}
        />
        <RotateButton open={open} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', p: 2, pl: 5, pr: 5 }}
        in={open}
        timeout="auto"
        unmountOnExit>
        {data.map(({ name, id, initChecked }) => (
          <Item
            name={name}
            id={`${id}`}
            groupChecked={null}
            onChooseItems={onChooseItems}
            initChecked={initChecked}
            key={id as string}
          />
        ))}
      </Collapse>
    </Box>
  )
})
