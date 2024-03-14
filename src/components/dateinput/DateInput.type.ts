import React from 'react'

import { Variant } from '../../styles/ts/types.ts'

export type DateInputUIConfig = {
  size: number
  variant?: Variant
}

export type DateInputConfig = {
  name?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  size: number
  value?: string
  variant?: Variant
}
