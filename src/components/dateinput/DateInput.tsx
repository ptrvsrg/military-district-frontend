import { StyledDateInput } from './DateInput.styled.ts'
import { DateInputProps } from './DateInput.types.ts'

export function DateInput(props: DateInputProps) {
  return <StyledDateInput {...props} type={'date'} />
}
