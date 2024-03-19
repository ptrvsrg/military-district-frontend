import { StylesConfig } from 'react-select'
import Async from 'react-select/async'

import { Color } from '../../styles/ts/colors.ts'
import { OptionType, SelectProps } from './Select.types.ts'

function getStyles(size: number, outlined?: boolean): StylesConfig<OptionType> {
  return {
    control: (state) => ({
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
    }),
    option: (base, state) => ({
      ...base,
      '&:hover': {
        backgroundColor: state.isFocused ? Color.LIGHT_GRAY : Color.WHITE,
      },
      backgroundColor: state.isFocused ? Color.LIGHT_GRAY : Color.WHITE,
      borderRadius: '10px',
      color: Color.BLACK,
      fontSize: size,
      padding: '10px 20px',
    }),
    placeholder: () => ({
      color: Color.LIGHT_GRAY,
      fontSize: size,
    }),
    singleValue: () => ({
      color: Color.WHITE,
      fontSize: size,
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    valueContainer: () => ({
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 0,
    }),
  }
}

export function Select(props: SelectProps) {
  return <Async defaultOptions {...props} styles={getStyles(props.size, props.outlined)}></Async>
}
