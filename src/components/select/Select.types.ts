import { ActionMeta, MultiValue, SingleValue } from 'react-select'

export interface OptionType {
  label: string
  value: string
}

export type AsyncSelectConfig = {
  isDisabled: boolean
  loadOptions?: (inputValue: string) => Promise<OptionType[]>
  onChange?: (newValue: MultiValue<OptionType> | SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void
  size: number
}

export type BasicSelectConfig = {
  isDisabled: boolean
  onChange?: (newValue: MultiValue<OptionType> | SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void
  options: OptionType[]
  size: number
}
