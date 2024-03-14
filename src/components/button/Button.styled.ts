import styled from 'styled-components'

import { Color } from '../../styles/ts/colors.ts'
import { Variant } from '../../styles/ts/types.ts'
import { ButtonTextUIConfig, ButtonUIConfig } from './Button.types.ts'

function getButtonColorByVariant(variant?: Variant): string {
  const defaultColor = Color.WHITE

  const colorMap: Map<Variant, Color> = new Map<Variant, Color>([
    [Variant.PRIMARY, Color.WHITE],
    [Variant.SECONDARY, Color.BLACK],
  ])

  return variant && colorMap.has(variant) ? colorMap.get(variant) || defaultColor : defaultColor
}

function getButtonTextColorByVariant(outlined?: boolean, variant?: Variant): string {
  const defaultColor = Color.BLACK

  const colorMap: Map<Variant, Color> = outlined
    ? new Map<Variant, Color>([
        [Variant.PRIMARY, Color.WHITE],
        [Variant.SECONDARY, Color.BLACK],
      ])
    : new Map<Variant, Color>([
        [Variant.PRIMARY, Color.BLACK],
        [Variant.SECONDARY, Color.WHITE],
      ])

  return variant && colorMap.has(variant) ? colorMap.get(variant) || defaultColor : defaultColor
}

export const StyledButton = styled.button<{ config: ButtonUIConfig }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  height: fit-content;
  width: fit-content;
  border-radius: 10px;
  border-style: solid;
  border-width: ${(props) => (props.config.outlined ? '3px' : '0px')};
  border-color: ${(props) => (props.config.outlined ? getButtonColorByVariant(props.config.variant) : 'none')};
  cursor: ${(props) => (props.config.disabled ? 'not-allowed' : 'pointer')};
  outline: none;
  background: ${(props) => (props.config.outlined ? 'transparent' : getButtonColorByVariant(props.config.variant))};
  color: ${(props) => getButtonTextColorByVariant(props.config.outlined, props.config.variant)};
  overflow: hidden;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`

export const StyledButtonText = styled.div<{ config: ButtonTextUIConfig }>`
  color: ${(props) => getButtonTextColorByVariant(props.config.outlined, props.config.variant)};
  font-size: ${(props) => `${props.config.size}px`};
  font-weight: normal;
  word-wrap: break-word;
`
