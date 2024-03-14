import React from 'react'

import { Variant } from '../../styles/ts/types.ts'

export type InputUIConfig = {
  size: number
  variant?: Variant
}

export type InputConfig = {
  name?: string
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void
  size: number
  value?: string
  variant?: Variant
}

export type InputWithActionConfig = {
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
