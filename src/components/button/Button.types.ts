import { Variant } from '../../styles/ts/types.ts'

export interface ButtonUIProps {
  disabled?: boolean
  outlined?: boolean
  variant?: Variant
}

export interface ButtonTextUIProps {
  outlined?: boolean
  size: number
  variant?: Variant
}

export interface ButtonProps {
  disabled?: boolean
  onClick?: any
  outlined?: boolean
  size: number
  text: string
  variant?: Variant
}
