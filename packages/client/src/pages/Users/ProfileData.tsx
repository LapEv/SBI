import { Box, TextField } from '@mui/material'
import { User } from 'storeAuth/interfaces'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import {
  MapProfileInputFields,
  MapProfileInputFieldsAdmin,
} from 'pages/Profile/ProfileFieldsData'
import { useAuth } from 'hooks/auth/useAuth'
import { useTheme } from '@mui/material/styles'
import { Nullable } from 'utils/nullableType'

type NullableString = Nullable<string>

interface ProfileValues extends User {
  list: {
    name: string
    label: string
    value: NullableString | string[] | undefined
    validation: object
    disabled: boolean
    type: string
  }[]
}

export const ProfileData = (userData: User) => {
  const theme = useTheme()
  const [{ admin }, { updateUserData }] = useAuth()

  const fieldsData = admin ? MapProfileInputFieldsAdmin : MapProfileInputFields

  const { reset, handleSubmit, control } = useForm<ProfileValues>({
    mode: 'onBlur',
    defaultValues: {
      list: fieldsData.map(data => ({
        ...data,
        value: userData![data.name as keyof typeof userData],
      })),
    },
  })
  const { errors, isValid } = useFormState({ control })
  const { fields } = useFieldArray({
    control,
    name: 'list',
  })

  function changeData(data: ProfileValues) {
    console.log('data = ', data)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(changeData)}
      sx={{ '& .MuiTextField-root': { m: 0, width: '55ch' } }}>
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
                required
                disabled={!admin}
                variant="outlined"
                sx={{ width: '88%', height: 65 }}
                margin="normal"
                // onChange={(event: ChangeEvent<HTMLInputElement>) => (
                //   field.onChange(event),
                //   updateUserData({
                //     ...userData!,
                //     ...{ [name]: event.target.value },
                //   })
                // )}
                error={!!(errors?.list ?? [])[index]?.value?.message}
                helperText={(errors?.list ?? [])[index]?.value?.message}
                inputProps={{ style: { height: 5 } }}
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
    </Box>
  )
}
