import styled from 'styled-components'

import { Color } from '../../styles/ts/colors.ts'
import { Variant } from '../../styles/ts/types.ts'
import { TextAlign, TextUIProps } from './Text.types.ts'

function getHeaderTextColorByVariant(variant?: Variant): string {
  const defaultColor = Color.WHITE

  const colorMap: Map<Variant, Color> = new Map<Variant, Color>([
    [Variant.PRIMARY, Color.WHITE],
    [Variant.SECONDARY, Color.BLACK],
  ])

  return variant && colorMap.has(variant) ? colorMap.get(variant) || defaultColor : defaultColor
}

function getPlainTextColorByVariant(variant?: Variant): string {
  const defaultColor = Color.WHITE

  const colorMap: Map<Variant, Color> = new Map<Variant, Color>([
    [Variant.EXTRA, Color.DARK_GRAY],
    [Variant.PRIMARY, Color.WHITE],
    [Variant.SECONDARY, Color.BLACK],
  ])

  return variant && colorMap.has(variant) ? colorMap.get(variant) || defaultColor : defaultColor
}

export const StyledText = styled.span<TextUIProps>`
  font-size: ${(props) => `${props.size}px`};
  line-height: ${(props) => `${props.size + 4}px`};
  font-weight: ${(props) => (props.bold ? 700 : 400)};
  text-decoration: ${(props) => (props.underlined ? 'underline' : 'none')};
  text-underline-offset: 0;
  text-underline-position: under;
  text-decoration-thickness: ${(props) => (props.bold ? (props.size > 20 ? '4px' : '2px') : props.size > 20 ? '2px' : '1px')};
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: ${(props) => props.align || TextAlign.LEFT};
`

export const StyledHeaderText = styled(StyledText)`
  color: ${(props) => getHeaderTextColorByVariant(props.variant)};
  text-decoration-color: ${(props) => getHeaderTextColorByVariant(props.variant)};
`

export const StyledPlainText = styled(StyledText)`
  color: ${(props) => getPlainTextColorByVariant(props.variant)};
  text-decoration-color: ${(props) => getPlainTextColorByVariant(props.variant)};
`
