import { useState, useEffect, memo } from 'react'
import { useTheme } from '@mui/material'
import { TextField } from 'components/TextFields/TextFields'
import { Autocomplete } from 'components/Autocomplete'
import { DataDropDownMultiple, Options } from './interface'
import { emptyValue } from '.'

export const DropDownMultiple = memo(
  ({
    data,
    props,
    onChange,
    value,
    label,
    errorLabel,
    error,
  }: DataDropDownMultiple) => {
    const theme = useTheme()
    const [errors, setErrors] = useState<boolean>(error as boolean)

    useEffect(() => {
      setErrors(error as boolean)
    }, [error])

    return (
      <Autocomplete
        multiple
        disableCloseOnSelect
        sx={{ width: '90%', ...props }}
        options={data}
        getOptionLabel={(option: unknown) => (option as Options).label}
        isOptionEqualToValue={(option, value): boolean =>
          (option as Options).label === (value as Options).label ||
          value === emptyValue
        }
        onChange={(_, textValue) =>
          (textValue as string).length
            ? (onChange?.(textValue as Options[]), setErrors(false))
            : (onChange?.(textValue as Options[]), setErrors(true))
        }
        value={value ?? emptyValue}
        ListboxProps={{
          sx: {
            borderWidth: 1,
            minHeight: 40,
            maxHeight: 225,
            fontSize: 13,

            '& li': {
              borderColor:
                theme.palette.mode === 'dark' ? '#1E515D' : '#C1EEE1',
            },
            '& :hover': {
              color: theme.palette.mode === 'dark' ? '#1E515D' : '#C1EEE1',
            },
          },
        }}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            error={errors}
            id={params.id}
            helperText={errors ? errorLabel : ''}
            InputProps={{
              ...params.InputProps,
              style: {
                padding: 0,
                minHeight: 42,
                height: 'auto',
                maxHeight: 200,
                overflowY: 'hidden',
              },
            }}
          />
        )}
      />
    )
  },
)
