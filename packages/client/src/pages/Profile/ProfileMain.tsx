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
import { pageProfile } from 'static/styles/pages/main'
import { ProfileAvatar } from './ProfileAvatar'
import { useFiles } from 'hooks/files/useFiles'
import { Files } from 'store/slices/files/interfaces'

export const ProfileMain = memo(({ setModal, dataUser }: ProfileMainProps) => {
  const [
    { userData, avatar },
    { updateUserData, deleteAvatar, changeAvatar, setAvatar },
  ] = useAuth()
  const [, { getAvatar }] = useFiles()
  const [btnDisabled] = useState<boolean>(true)

  const { handleSubmit, control } = useForm<ProfileValues>({
    mode: 'onBlur',
    defaultValues: {
      list: MapProfileInputFields.map(item => ({
        ...item,
        value: dataUser[item.name as keyof typeof dataUser],
      })),
    },
  })
  const { errors } = useFormState({ control })
  const { fields } = useFieldArray({
    control,
    name: 'list',
  })

  const changeData = () => {
    console.log('Change Data')
  }

  const clearChange = () => {
    console.log('clearChange')
  }

  useEffect(() => {
    const file = userData?.Files as Files[]
    if (!file.length) return
    const pathfile = file[0].path
    getAvatar(pathfile)
  }, [])

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(changeData)}
      sx={{ ...pageProfile, maxWidth: 1200 }}>
      <ProfileAvatar
        id={dataUser.id}
        changeAvatar={changeAvatar}
        deleteAvatar={deleteAvatar}
        setAvatar={setAvatar}
        avatar={avatar.length ? JSON.parse(avatar) : ''}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          mt: 3,
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
                      disabled={true}
                      sx={{ width: '48%', height: 40 }}
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
            },
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
        sx={{ justifyContent: 'space-between' }}
      />
    </Box>
  )
})
