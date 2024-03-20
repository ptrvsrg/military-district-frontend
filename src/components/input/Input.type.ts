import { CSSObject } from 'styled-components'

import { Variant } from '../../styles/ts/types.ts'

export interface InputUIProps {
  fontSize: number
  variant?: Variant
}

export interface InputProps {
  fontSize: number
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  styles?: { input?: CSSObject; wrapper?: CSSObject }
  value?: string
  variant?: Variant
}

export interface InputWithActionProps {
  fontSize: number
  image: string
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: any
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  styles?: { input?: CSSObject; wrapper?: CSSObject }
  value?: string
  variant?: Variant
}
