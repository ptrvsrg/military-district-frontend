import { Variant } from '../../styles/ts/types.ts'

export enum TextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export interface TextUIProps {
  align?: TextAlign
  bold?: boolean
  size: number
  underlined?: boolean
  variant?: Variant
}

export interface TextProps {
  align?: TextAlign
  bold?: boolean
  size: number
  text: string
  underlined?: boolean
  variant?: Variant
}
