import { StylesConfig } from 'react-select'
import Async from 'react-select/async'

import { Color } from '../../styles/ts/colors.ts'
import { OptionType, SelectProps } from './Select.types.ts'

function getStyles(size: number, outlined?: boolean): StylesConfig<OptionType> {
  return {
    control: (baseStyles, state) => ({
      ...baseStyles,
      '&:hover': {
        boxShadow: 'none',
      },
      alignItems: 'center',
      backgroundColor: state.isDisabled ? Color.DARK_GRAY : 'transparent',
      border: outlined === undefined || outlined ? `2px solid ${Color.WHITE}` : 'none',
      borderRadius: '10px',
      boxShadow: 'none',
      display: 'flex',
      flexDirection: 'row',
      gap: '20px',
      justifyContent: 'center',
      minWidth: '200px',
      padding: '10px 20px',
    }),
    dropdownIndicator: () => ({
      '&:hover': {
        color: Color.WHITE,
      },
      alignItems: 'center',
      color: Color.WHITE,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 0,
    }),
    indicatorSeparator: () => ({}),
    input: (baseStyles) => ({
      ...baseStyles,
      color: Color.WHITE,
      fontSize: size,
      margin: 0,
      padding: 0,
    }),
    loadingIndicator: (baseStyles) => ({
      ...baseStyles,
      color: Color.WHITE,
    }),
    loadingMessage: (baseStyles) => ({
      ...baseStyles,
      color: Color.BLACK,
      fontSize: size,
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: Color.WHITE,
      borderRadius: '10px',
      maxWidth: '100%',
      minWidth: 'fit-content',
    }),
    option: (state) => ({
      '&:hover': {
        backgroundColor: state.isFocused ? Color.LIGHT_GRAY : Color.WHITE,
      },
      backgroundColor: state.isFocused ? Color.LIGHT_GRAY : Color.WHITE,
      borderRadius: '10px',
      color: Color.BLACK,
      fontSize: size,
      minWidth: 'fit-content',
      padding: '10px 20px',
      whiteSpace: 'nowrap',
    }),
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
      color: Color.DARK_GRAY,
      display: state.isFocused ? 'none' : 'block',
      fontSize: size,
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: Color.WHITE,
      fontSize: size,
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 0,
    }),
  }
}

export function Select(props: SelectProps) {
  return <Async defaultOptions {...props} styles={getStyles(props.size, props.outlined)} />
}
