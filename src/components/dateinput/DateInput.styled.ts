import styled from 'styled-components'

import calendar from '../../assets/calendar.svg'
import { Color } from '../../styles/ts/colors.ts'
import { Variant } from '../../styles/ts/types.ts'
import { DateInputUIConfig } from './DateInput.type.ts'

function getColorByVariant(variant?: Variant): string {
  const defaultColor = Color.WHITE

  const colorMap: Map<Variant, Color> = new Map<Variant, Color>([[Variant.PRIMARY, Color.WHITE]])
  return variant ? colorMap.get(variant) || defaultColor : defaultColor
}

export const StyledDateInput = styled.input<{ config: DateInputUIConfig }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  background-color: transparent;
  color: ${(props) => getColorByVariant(props.config.variant)};
  font-size: ${(props) => `${props.config.size}px`};
  line-height: ${(props) => `${props.config.size}px`};
  word-wrap: break-word;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => getColorByVariant(props.config.variant)};
  overflow: hidden;

  &:focus {
    outline: none;
  }

  &::-webkit-calendar-picker-indicator {
    color: rgba(0, 0, 0, 0);
    opacity: 1;
    background-image: url(${calendar});
    height: ${(props) => `${props.config.size}px`};
    width: ${(props) => `${props.config.size}px`};
    cursor: pointer;
  }
`
