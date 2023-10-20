import { Box, Typography, useTheme } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import {
  MapPasswordInputFields,
  styleTextFieldProps,
  style,
} from './ProfileFieldsData'
import { TextField } from 'components/TextFields/TextFields'
import { ButtonsModalSection } from 'components/Buttons'
import {
  ProfileChangePasswordProps,
  ProfileChangePasswordValues,
} from './interfaces'
import { useAuth } from 'hooks/auth/useAuth'

export function ProfileChangePassword({
  handleModal,
  userId,
}: ProfileChangePasswordProps) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [_, { changePassword }] = useAuth()
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const { handleSubmit, control } = useForm<ProfileChangePasswordValues>({
    mode: 'onBlur',
    defaultValues: {
      list: MapPasswordInputFields,
    },
  })
  const { errors } = useFormState({ control })
  const { fields } = useFieldArray({
    control,
    name: 'list',
  })
  const theme = useTheme()

  function changePasswordData(data: ProfileChangePasswordValues) {
    changePassword({
      oldPassword: data.list[0].value,
      newPassword: data.list[1].value,
      id: userId,
    })
    handleModal(false)
  }

  return (
    <Box
      sx={style}
      component="form"
      onSubmit={handleSubmit(changePasswordData)}>
      <Typography variant={'h6'}>Смена пароля</Typography>
      {fields.map(({ id, label, validation, type, value }, index) => {
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
                sx={{ width: '90%', m: 2, mt: 4, height: 40 }}
                margin="normal"
                value={field.value || ''}
                error={!!(errors?.list ?? [])[index]?.value?.message}
                helperText={(errors?.list ?? [])[index]?.value?.message}
                inputProps={{
                  style: {
                    ...styleTextFieldProps.inputProps,
                    backgroundColor: theme.palette.background.paper,
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
      <ButtonsModalSection
        closeModal={() => handleModal(false)}
        btnName="Сохранить"
      />
    </Box>
  )
}
