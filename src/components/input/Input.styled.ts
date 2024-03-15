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
  width: 100%;
  padding: 10px 0;
  background-color: transparent;
  color: ${(props) => getColorByVariant(props.variant)};
  font-size: ${(props) => `${props.size}px`};
  line-height: ${(props) => `${props.size}px`};
  font-weight: normal;
  word-wrap: break-word;
  overflow: hidden;
  border: none;

  &:focus {
    outline: none;
  }
`

export const InputWrapper = styled.div<{ variant?: Variant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow-wrap: break-word;
  background-color: transparent;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => getColorByVariant(props.variant)};
  gap: 20px;
  padding: 0 20px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`

export const Img = styled.img`
  height: 60%;
`
