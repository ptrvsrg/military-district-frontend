import { StyledDateInput } from './DateInput.styled.ts'
import { DateInputProps } from './DateInput.type.ts'

export function DateInput(props: DateInputProps) {
  return <StyledDateInput {...props} type={'date'}></StyledDateInput>
}
