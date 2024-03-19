import { OptionType } from '../../components/select/Select.types.ts'
import { Attribute } from './CreatableSelectStore.ts'

export interface CreatableSelectProps {
  loadOptions: (inputValue: string) => Promise<OptionType[]>
  onCreate: (attribute: Attribute) => void
  onDelete: (attribute: Attribute) => void
  placeholder?: string
  size: number
}
