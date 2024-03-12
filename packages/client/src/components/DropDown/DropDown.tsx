import { useState, useEffect, memo } from 'react'
import { Box, useTheme } from '@mui/material'
import { Autocomplete } from 'components/Autocomplete'
import { DataDropDown, Options } from './interface'
import { emptyValue } from '.'
import { TextField } from 'components/TextFields'

export const DropDown = memo(
  ({
    data,
    props,
    onChange,
    onBlur,
    value,
    label,
    errorLabel,
    error,
    textProps,
    tabIndex,
  }: DataDropDown) => {
    const theme = useTheme()
    const [errors, setErrors] = useState<boolean>(error as boolean)

    useEffect(() => {
      setErrors(error as boolean)
    }, [error])

    return (
      <Autocomplete
        forcePopupIcon={true}
        clearOnEscape
        autoSelect={false}
        sx={{ width: '90%', height: 40, ...props }}
        options={data}
        noOptionsText={'Нет данных'}
        filterOptions={(option, { inputValue }): unknown[] => {
          if (inputValue === '') return option
          const value = inputValue.toLowerCase().trim()
          const displayOptions = option.filter((item): unknown => {
            if ((item as Options).label.toLowerCase().trim().includes(value)) {
              return item
            }
            if (
              (item as Options)?.description &&
              (item as Options)?.description?.length &&
              (item as Options)?.description
                ?.toLowerCase()
                .trim()
                .includes(value)
            ) {
              return item
            }
            if (
              (item as Options)?.descriptionID &&
              (item as Options)?.descriptionID?.length &&
              (item as Options)?.descriptionID
                ?.toLowerCase()
                .trim()
                .includes(value)
            ) {
              return item
            }
          })
          return displayOptions ?? []
        }}
        isOptionEqualToValue={(option, value): boolean => {
          return (
            (option as Options).label === value ||
            (option as Options).id === value ||
            (option as Options).description === value ||
            (option as Options).descriptionID === value ||
            value === ''
          )
        }}
        onChange={(_, textValue) =>
          textValue
            ? (onChange?.(textValue as Options), setErrors(false))
            : (onChange?.(emptyValue as Options), setErrors(true))
        }
        value={value ?? ''}
        renderOption={(props, option) => (
          <li {...props}>
            <Box
              component="span"
              sx={{
                width: 14,
                height: 14,
                flexShrink: 0,
                borderRadius: '3px',
                mr: 1,
                mt: '2px',
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              {(option as Options).label}
              {(option as Options).description && (
                <div>
                  <span>{(option as Options).description}</span>
                </div>
              )}
              {(option as Options).descriptionID && (
                <div>
                  <span>{(option as Options).descriptionID}</span>
                </div>
              )}
            </Box>
          </li>
        )}
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
              fontWeight: 'bold',
            },
          },
        }}
        renderInput={params => (
          <TextField
            onBlur={event => (
              !event.target.value ? setErrors(true) : setErrors(false),
              onBlur?.(event.target.value)
            )}
            {...params}
            sx={textProps}
            required
            variant="outlined"
            label={label}
            error={errors}
            id={params.id}
            helperText={errors ? errorLabel : ''}
            InputProps={{
              ...params.InputProps,
              tabIndex,
            }}
          />
        )}
      />
    )
  }
)
