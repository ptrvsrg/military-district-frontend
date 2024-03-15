import React from 'react'

import { Variant } from '../../styles/ts/types.ts'

export interface InputUIProps {
  size: number
  variant?: Variant
}

export interface InputProps {
  name?: string
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void
  size: number
  value?: string
  variant?: Variant
}

export interface InputWithActionProps {
  action?: any
  image: string
  name?: string
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void
  size: number
  value?: string
  variant?: Variant
}
