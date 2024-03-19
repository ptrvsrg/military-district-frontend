import { ActionMeta, MultiValue, SingleValue } from 'react-select'

export interface OptionType {
  label: string
  value: string
}

export interface SelectProps {
  isDisabled: boolean
  loadOptions?: (inputValue: string) => Promise<OptionType[]>
  onChange?: (newValue: MultiValue<OptionType> | SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void
  outlined?: boolean
  placeholder?: string
  size: number
}
