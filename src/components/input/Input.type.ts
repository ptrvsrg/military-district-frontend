import { CSSObject } from 'styled-components'

import { Variant } from '../../styles/ts/types.ts'

export interface InputUIProps {
  size: number
  variant?: Variant
}

export interface InputProps {
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void
  size: number
  styles?: { input?: CSSObject; wrapper?: CSSObject }
  value?: string
  variant?: Variant
}

export interface InputWithActionProps {
  image: string
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: any
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void
  size: number
  styles?: { input?: CSSObject; wrapper?: CSSObject }
  value?: string
  variant?: Variant
}
