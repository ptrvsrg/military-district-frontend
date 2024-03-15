import { Variant } from '../../styles/ts/types.ts'

export interface TextUIProps {
  bold?: boolean
  size: number
  underlined?: boolean
  variant?: Variant
}

export interface TextProps {
  bold?: boolean
  size: number
  text: string
  underlined?: boolean
  variant?: Variant
}
