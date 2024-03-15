import React from 'react'

import { Variant } from '../../styles/ts/types.ts'

export interface DateInputUIProps {
  size: number
  variant?: Variant
}

export interface DateInputProps {
  name?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  size: number
  value?: string
  variant?: Variant
}
