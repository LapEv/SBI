import React, { memo, useRef } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, SyntheticEvent } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle, boxDataModal } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import { useIncidents } from 'hooks/incidents/useINC'
import { TypesOfWork } from 'store/slices/incidents/interfaces'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import { printType } from '../data'

export const PrintINC = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    ({ handleModal, title }: ChooseModalProps, ref) => {
      /* eslint-enable @typescript-eslint/no-unused-vars */
      const [{ incidents }] = useIncidents()
      const [selectedType, setSelectedType] = useState<string>('normal')

      const contentToPrint = useRef(null)
      const handlePrint = useReactToPrint({
        documentTitle: 'Print This Document',
        onBeforePrint: () => console.log('before printing...'),

        onAfterPrint: () => {
          console.log('after printing...')
        },
        removeAfterPrint: true,
      })

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        handlePrint(null, () => contentToPrint.current)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (checked) {
          setSelectedType(id)
          return
        }
        if (!checked && id === selectedType) {
          setSelectedType(id)
          return
        }
        return
      }

      return (
        <Box
          sx={{ ...modalStyle, paddingLeft: 5 }}
          component="form"
          onSubmit={changeData}>
          <Typography variant={'h6'}>{title}</Typography>
          <Box sx={{ ...boxDataModal }}>
            {printType.map(({ label, value }, index) => (
              <Item
                name={label}
                id={`${value}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={`${value}${index}` as string}
                initChecked={selectedType === value ? true : false}
                oneChecked={selectedType === value ? true : false}
                noEmpty={true}
              />
            ))}
          </Box>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Печать"
          />
          <Box sx={{ textAlign: 'center' }} style={{ display: 'none' }}>
            <ReactToPrint content={() => contentToPrint.current!} />
            <Box ref={contentToPrint} sx={{ textAlign: 'center' }}>
              <Typography variant="h4">Booking details</Typography>
            </Box>
          </Box>
        </Box>
      )
    }
  )
)
