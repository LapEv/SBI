import { useAuth } from 'hooks/auth/useAuth'
import React, { memo, useState } from 'react'
import { doubleMenuForHeader } from 'static/styles/headerForPages'
import { menuData } from '../data'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { IconPopoverButton } from 'components/Buttons'
import { Box, Modal } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate'
import { ChooseModal } from '../Modals'
import { PrintBar } from './PrintBar'
import { DenseTable } from './DenseTable'
import { DragTable } from './DragTable'

interface AdditionalMenu {
  denseTable: boolean
  setDenseTableFunc: (state: boolean) => void
  onPrint: () => void
  checkClickMenu: (name: string | null) => void
  dragTable: boolean
  setDragTable: (state: boolean) => void
}

export const AdditionalMenu = memo(
  ({
    denseTable,
    setDenseTableFunc,
    onPrint,
    checkClickMenu,
    dragTable,
    setDragTable,
  }: AdditionalMenu) => {
    const [{ admin }] = useAuth()

    return (
      <>
        <PrintBar onPrint={onPrint} />
        <DenseTable denseTable={denseTable} setDenseTable={setDenseTableFunc} />
        <IconPopoverButton
          popover={'Создать инцидент'}
          onClick={() => checkClickMenu('newIncident')}
          vertical={'bottom'}
          propsPopover={{ ml: -1, mt: 1 }}
          sx={{ width: 33, height: 33 }}
          icon={<AddCircleOutlineIcon />}
        />
        <IconPopoverButton
          popover={'Создать запрос'}
          onClick={() => checkClickMenu('newRequest')}
          vertical={'bottom'}
          propsPopover={{ ml: -1, mt: 1 }}
          sx={{ width: 33, height: 33 }}
          icon={<ControlPointDuplicateIcon />}
        />
        {dragTable && (
          <DragTable dragTable={dragTable} setDragTable={setDragTable} />
        )}
        {admin && (
          <DropDownMenu
            popover={'Добавить/Удалить'}
            data={menuData}
            divider={[3, 6, 9]}
            onClick={checkClickMenu}
            vertical={'bottom'}
            sx={{ width: 33, height: 33 }}
          />
        )}
      </>
    )
  }
)
