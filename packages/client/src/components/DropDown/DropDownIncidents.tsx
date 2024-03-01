import { useState, useEffect, memo } from 'react'
import { Box, Popper, useTheme } from '@mui/material'
import { TextFieldIncidents } from 'components/TextFields'
import { AutocompleteIncidents } from 'components/Autocomplete'
import { DataDropDown, Options } from './interface'
import { emptyValue } from '.'

export const DropDownIncidents = memo(
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
    disableClearable,
    tabIndex,
  }: DataDropDown) => {
    const theme = useTheme()
    const [errors, setErrors] = useState<boolean>(error as boolean)

    useEffect(() => {
      setErrors(error as boolean)
    }, [error])

    const CustomPopper = (props: any) => {
      return (
        <Popper
          {...props}
          placement="bottom"
          sx={{ height: '10px' }}
          style={{
            width: props.anchorEl.clientWidth,
            height: '5px',
            zIndex: 1,
          }}
        />
      )
    }

    return (
      <AutocompleteIncidents
        forcePopupIcon={true}
        clearOnEscape
        disableClearable={disableClearable ?? false}
        autoSelect={false}
        sx={{ width: '90%', height: 40, ...props }}
        options={data}
        noOptionsText={'Нет данных!'}
        filterOptions={(option, { inputValue }): any => {
          if (inputValue === '') return option
          const value = inputValue.toLowerCase().trim()
          const displayOptions = option.filter((item): any => {
            if ((item as any).label.toLowerCase().trim().includes(value)) {
              return item
            }
            if (
              (item as any).description &&
              (item as any).description.length &&
              (item as any).description.toLowerCase().trim().includes(value)
            ) {
              return item
            }
            if (
              (item as any).descriptionID &&
              (item as any).descriptionID.length &&
              (item as any).descriptionID.toLowerCase().trim().includes(value)
            ) {
              return item
            }
          })
          return displayOptions ?? []
        }}
        isOptionEqualToValue={(option, value): any => {
          return (
            (option as any).label === value ||
            (option as any).id === value ||
            (option as any).description === value ||
            (option as any).descriptionID === value ||
            value === ''
          )
        }}
        onChange={(_, textValue) =>
          textValue
            ? (onChange?.(textValue as Options), setErrors(false))
            : (onChange?.(emptyValue as Options), setErrors(true))
        }
        value={value ?? ''}
        renderOption={(props, option, { selected }) => (
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
              {(option as any).label}
              {(option as any).description && (
                <div>
                  <span>{(option as any).description}</span>
                </div>
              )}
              {(option as any).descriptionID && (
                <div>
                  <span>{(option as any).descriptionID}</span>
                </div>
              )}
            </Box>
          </li>
        )}
        PopperComponent={CustomPopper}
        componentsProps={{
          paper: {
            style: {
              backgroundColor:
                theme.palette.mode === 'light' ? '#C1EEE1' : '#1E515D',
            },
          },
        }}
        ListboxProps={{
          sx: {
            borderWidth: 1,
            minHeight: 30,
            maxHeight: 225,
            fontSize: 14,
            color:
              theme.palette.mode === 'light'
                ? '#000000!important'
                : '#FFFFFF!important',
            '& li': {
              borderColor:
                theme.palette.mode === 'light'
                  ? '#000000!important'
                  : '#C1EEE1!important',
            },
            '& :hover': {
              color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
              fontWeight: 'bold',
            },
            '& [aria-selected="true"]': {
              color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
              backgroundColor:
                theme.palette.mode === 'light'
                  ? '#a8dfcf!important'
                  : '#1E515D',
              fontWeight: 'bold',
            },
          },
        }}
        renderInput={params => (
          <TextFieldIncidents
            onBlur={event => (
              !event.target.value ? setErrors(true) : setErrors(false),
              onBlur?.(event.target.value)
            )}
            {...params}
            sx={{ width: '100%' }}
            required
            variant="outlined"
            label={label}
            error={errors}
            id={params.id}
            value={value}
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
