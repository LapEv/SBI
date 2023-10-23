import { Box, Stack } from '@mui/material'
import { MapProfileInputFields } from './ProfileFieldsData'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { useAuth } from 'hooks/auth/useAuth'
import { User } from 'storeAuth/interfaces'
import { ChangeEvent, useEffect, useState } from 'react'
import { TextField } from 'components/TextFields/TextFields'
import { useTheme } from '@mui/material/styles'
import { Button, ButtonsSection } from 'components/Buttons'
import { ProfileValues } from './interfaces'
import { deepEqual } from 'utils/deepEqual'
import { ProfileHeader } from './ProfileHeader'
import { FileProps } from 'storeAuth/interfaces'
import { useMessage } from 'hooks/message/useMessage'

interface ProfileMainProps {
  setModal: () => void
  data: User
}

export function ProfileMain({ setModal, data }: ProfileMainProps) {
  const [{ userData }, { updateUserData, updateUser, changeAvatar }] = useAuth()
  const [_, { setMessage }] = useMessage()
  const [btnDisabled, setbtnDisabled] = useState<boolean>(true)
  const [file, setFile] = useState<FileProps>({ data: '', info: undefined })
  const theme = useTheme()

  const { handleSubmit, control, reset } = useForm<ProfileValues>({
    mode: 'onBlur',
    defaultValues: {
      list: MapProfileInputFields.map(item => ({
        ...item,
        value: data![item.name as keyof typeof data],
      })),
    },
  })
  const { errors, isValid } = useFormState({ control })
  const { fields } = useFieldArray({
    control,
    name: 'list',
  })

  const changeData = () => {
    if (file.info) {
      console.log('Меняем аватарку')
      setMessage({
        text: 'В разработке',
        type: 'info',
      })
      // changeAvatar(file)
    }
    if (!deepEqual(userData, data)) {
      console.log('Меняем данные')
      updateUser(userData)
    }
  }

  const clearChange = () => {
    updateUserData(data)
    reset({
      list: MapProfileInputFields.map(item => ({
        ...item,
        value: data![item.name as keyof typeof data],
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
    setbtnDisabled(deepEqual(userData, data))
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
          {fields.map(({ id, name, label, validation, type, value }, index) => {
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
                    variant="outlined"
                    sx={{ width: '48%', height: 80 }}
                    margin="normal"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => (
                      field.onChange(event),
                      updateUserData({
                        ...userData!,
                        ...{ [name]: event.target.value },
                      })
                    )}
                    error={!!(errors?.list ?? [])[index]?.value?.message}
                    helperText={(errors?.list ?? [])[index]?.value?.message}
                    inputProps={{
                      style: {
                        height: 5,
                        borderRadius: 5,
                        padding: '16px 14px',
                        backgroundColor:
                          theme.palette.mode === 'dark' ? '#C1EEE1' : '#1E515D',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        top: -7,
                        marginTop: 0,
                        color: value
                          ? theme.palette.mode === 'dark'
                            ? '#C1EEE1'
                            : '#1E515D'
                          : theme.palette.mode === 'dark'
                          ? '#1E515D'
                          : '#C1EEE1',
                      },
                    }}
                    FormHelperTextProps={{
                      style: { height: 0, marginTop: -1, zIndex: 999 },
                    }}
                  />
                )}
              />
            )
          })}
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
}
