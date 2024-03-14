import { Variant } from '../../styles/ts/types.ts'

export type ButtonUIConfig = {
  disabled?: boolean
  outlined?: boolean
  variant?: Variant
}

export type ButtonTextUIConfig = {
  outlined?: boolean
  size: number
  variant?: Variant
}

export type ButtonConfig = {
  disabled?: boolean
  onClick?: any
  outlined?: boolean
  size: number
  text: string
  variant?: Variant
}
