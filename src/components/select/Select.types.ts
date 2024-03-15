import { ActionMeta, MultiValue, SingleValue } from 'react-select'

export interface OptionType {
  label: string
  value: string
}

export interface AsyncSelectProps {
  isDisabled: boolean
  loadOptions?: (inputValue: string) => Promise<OptionType[]>
  onChange?: (newValue: MultiValue<OptionType> | SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void
  size: number
}

export interface BasicSelectProps {
  isDisabled: boolean
  onChange?: (newValue: MultiValue<OptionType> | SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void
  options: OptionType[]
  size: number
}
