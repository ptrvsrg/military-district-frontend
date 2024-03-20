import styled from 'styled-components'

import { Color } from '../../styles/ts/colors.ts'
import { Variant } from '../../styles/ts/types.ts'
import { InputUIProps } from './Input.type.ts'

function getColorByVariant(variant?: Variant): string {
  const defaultColor = Color.WHITE

  const colorMap: Map<Variant, Color> = new Map<Variant, Color>([[Variant.PRIMARY, Color.WHITE]])
  return variant ? colorMap.get(variant) || defaultColor : defaultColor
}

export const StyledInput = styled.input<InputUIProps>`
  align-items: center;
  justify-content: center;
  display: inline-flex;
  box-sizing: border-box;
  width: fit-content;
  padding: 10px 0;
  background-color: transparent;
  color: ${(props) => getColorByVariant(props.variant)};
  font-size: ${(props) => `${props.fontSize}px`};
  line-height: ${(props) => `${props.fontSize}px`};
  font-weight: normal;
  word-wrap: break-word;
  overflow: hidden;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${Color.DARK_GRAY};
  }
`

export const InputWrapper = styled.div<{ variant?: Variant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  overflow-wrap: break-word;
  background-color: transparent;
  border-radius: 10px;
  border: ${(props) => getColorByVariant(props.variant)} solid 2px;
  gap: 20px;
  padding: 0 20px;
  box-sizing: border-box;
`
