import Select, { StylesConfig } from 'react-select'
import Async from 'react-select/async'

import { Color } from '../../styles/ts/colors.ts'
import { AsyncSelectProps, BasicSelectProps, OptionType } from './Select.types.ts'

function getStyles(size: number): StylesConfig<OptionType> {
  return {
    control: (baseStyles, state) => ({
      ...baseStyles,
      '&:hover': {
        boxShadow: 'none',
      },
      backgroundColor: state.isDisabled ? Color.DARK_GRAY : 'transparent',
      borderColor: Color.WHITE,
      borderRadius: '10px',
      borderStyle: 'solid',
      borderWidth: '2px',
      boxShadow: 'none',
      padding: '5px 10px',
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      '&:hover': {
        color: Color.WHITE,
      },
      color: Color.WHITE,
    }),
    indicatorSeparator: () => ({}),
    input: (baseStyles) => ({
      ...baseStyles,
      color: Color.WHITE,
      fontSize: size,
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
      borderRadius: '10px',
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      '&:hover': {
        backgroundColor: state.isFocused ? Color.LIGHT_GRAY : Color.WHITE,
      },
      backgroundColor: state.isFocused ? Color.LIGHT_GRAY : Color.WHITE,
      borderRadius: '10px',
      color: Color.BLACK,
      fontSize: size,
      padding: '5px 10px',
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: Color.LIGHT_GRAY,
      fontSize: size,
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: Color.WHITE,
      fontSize: size,
    }),
  }
}

export function AsyncSelect(props: AsyncSelectProps) {
  return <Async defaultOptions {...props} styles={getStyles(props.size)}></Async>
}

export function BasicSelect(props: BasicSelectProps) {
  return <Select {...props} styles={getStyles(props.size)}></Select>
}
