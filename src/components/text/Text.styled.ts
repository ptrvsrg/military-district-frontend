import styled from 'styled-components'

import { Color } from '../../styles/ts/colors.ts'
import { Variant } from '../../styles/ts/types.ts'
import { TextUIConfig } from './Text.types.ts'

function getTextColorByVariant(variant?: Variant): string {
  const defaultColor = Color.WHITE

  const colorMap: Map<Variant, Color> = new Map<Variant, Color>([
    [Variant.EXTRA, Color.DARK_GRAY],
    [Variant.PRIMARY, Color.WHITE],
    [Variant.SECONDARY, Color.BLACK],
  ])

  return variant && colorMap.has(variant) ? colorMap.get(variant) || defaultColor : defaultColor
}

export const StyledText = styled.span<{ config: TextUIConfig }>`
  color: ${(props) => getTextColorByVariant(props.config.variant)};
  text-decoration-color: ${(props) => getTextColorByVariant(props.config.variant)};
  font-size: ${(props) => `${props.config.size}px`};
  line-height: ${(props) => `${props.config.size + 4}px`};
  font-weight: ${(props) => (props.config.bold ? 700 : 400)};
  text-decoration: ${(props) => (props.config.underlined ? 'underline' : 'none')};
  text-underline-offset: 0;
  text-underline-position: under;
  text-decoration-thickness: ${(props) => (props.config.bold ? (props.config.size > 20 ? '4px' : '2px') : props.config.size > 20 ? '2px' : '1px')};
  word-wrap: break-word;
  overflow-wrap: break-word;
`
