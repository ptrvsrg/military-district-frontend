import styled from 'styled-components'

import calendar from '../../assets/calendar.svg'
import { Color } from '../../styles/ts/colors.ts'
import { Variant } from '../../styles/ts/types.ts'
import { DateInputUIProps } from './DateInput.types.ts'

function getColorByVariant(variant?: Variant): string {
  const defaultColor = Color.WHITE

  const colorMap: Map<Variant, Color> = new Map<Variant, Color>([[Variant.PRIMARY, Color.WHITE]])
  return variant ? colorMap.get(variant) || defaultColor : defaultColor
}

export const StyledDateInput = styled.input<DateInputUIProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  background-color: transparent;
  color: ${(props) => getColorByVariant(props.variant)};
  font-size: ${(props) => `${props.size}px`};
  line-height: ${(props) => `${props.size}px`};
  word-wrap: break-word;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => getColorByVariant(props.variant)};
  overflow: hidden;

  &:focus {
    outline: none;
  }

  &::-webkit-calendar-picker-indicator {
    color: transparent;
    opacity: 1;
    background-image: url(${calendar});
    height: ${(props) => `${props.size}px`};
    width: ${(props) => `${props.size}px`};
    cursor: pointer;
  }
`
