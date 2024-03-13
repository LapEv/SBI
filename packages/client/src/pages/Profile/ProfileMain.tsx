import { Box, Stack } from '@mui/material'
import { MapProfileInputFields } from './ProfileFieldsData'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { useAuth } from 'hooks/auth/useAuth'
import { ChangeEvent, memo, useEffect, useState } from 'react'
import { TextField } from 'components/TextFields'
import { Button, ButtonsSection } from 'components/Buttons'
import { ProfileMainProps, ProfileValues } from './interfaces'
import { deepEqual } from 'utils/deepEqual'
import { ProfileHeader } from './ProfileHeader'
import { FileProps } from 'storeAuth/interfaces'
import { useMessage } from 'hooks/message/useMessage'

export const ProfileMain = memo(({ setModal, data }: ProfileMainProps) => {
  const [, { setMessage }] = useMessage()
  const [{ userData }, { updateUserData, updateUser }] = useAuth()
  const [btnDisabled, setbtnDisabled] = useState<boolean>(true)
  const [file, setFile] = useState<FileProps>({ data: '', info: undefined })

  const { handleSubmit, control, reset } = useForm<ProfileValues>({
    mode: 'onBlur',
    defaultValues: {
      list: MapProfileInputFields.map(item => ({
        ...item,
        value: data[item.name as keyof typeof data],
      })),
    },
  })
  const { errors } = useFormState({ control })
  const { fields } = useFieldArray({
    control,
    name: 'list',
  })

  const changeData = () => {
    if (file.info) {
      setMessage({
        text: 'В разработке',
        type: 'info',
      })
      // changeAvatar(file)
    }
    if (
      !deepEqual(userData as Record<never, never>, data as Record<never, never>)
    ) {
      updateUser(userData)
    }
  }

  const clearChange = () => {
    updateUserData(data)
    reset({
      list: MapProfileInputFields.map(item => ({
        ...item,
        value: data[item.name as keyof typeof data],
      })),
    })
    setFile({ data: '', info: undefined } as FileProps)
  }

  const onChooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (!event.target.files) return
      setFile({ info: event.target?.files[0], data: reader.result })
    }
    event.target.files instanceof FileList
      ? reader.readAsDataURL(event.target.files[0])
      : console.log('handle exception')
  }

  useEffect(() => {
    if (file.info) return
    setbtnDisabled(
      deepEqual(userData as Record<never, never>, data as Record<never, never>)
    )
  }, [userData])

  useEffect(() => {
    setbtnDisabled(file.info ? false : true)
  }, [file])

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(changeData)}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ProfileHeader
        component="header"
        onChooseFile={onChooseFile}
        fileData={file?.data}
        avatar={(data.avatar as string) ?? ''}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          p: 3,
          width: '95%',
        }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          sx={{ flexWrap: 'wrap' }}>
          {fields.map(
            ({ id, name, label, validation, type, required }, index) => {
              return (
                <Controller
                  key={id}
                  control={control}
                  name={`list.${index}.value`}
                  rules={validation}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      inputRef={field.ref}
                      label={label}
                      type={type}
                      required={required ?? true}
                      variant="outlined"
                      sx={{ width: '48%', height: 80 }}
                      margin="normal"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => (
                        field.onChange(event),
                        updateUserData({
                          ...userData,
                          ...{ [name]: event.target.value },
                        })
                      )}
                      error={!!(errors?.list ?? [])[index]?.value?.message}
                      helperText={(errors?.list ?? [])[index]?.value?.message}
                    />
                  )}
                />
              )
            }
          )}
        </Stack>
      </Box>
      <Button onClick={setModal} sx={{ width: '40%' }}>
        Изменить пароль
      </Button>
      <ButtonsSection
        btnSecondHandle={clearChange}
        btnName="Сохранить"
        btnDisabled={btnDisabled}
        btnSecondDisabled={btnDisabled}
        btnSecondName="Отменить изменения"
      />
    </Box>
  )
})
