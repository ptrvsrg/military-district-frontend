import { StyledDateInput } from './DateInput.styled.ts'
import { DateInputConfig } from './DateInput.type.ts'

export function DateInput({ config }: { config: DateInputConfig }) {
  return <StyledDateInput config={config} onChange={config.onChange} type={'date'} value={config.value}></StyledDateInput>
}
