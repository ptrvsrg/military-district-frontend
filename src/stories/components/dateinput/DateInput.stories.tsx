import { useState } from 'react'

import { DateInput } from '../../../components/dateinput/DateInput.tsx'
import { DateInputProps } from '../../../components/dateinput/DateInput.types.ts'
import { Variant } from '../../../styles/ts/types.ts'

export default {
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [Variant.PRIMARY],
    },
  },
  component: DateInput,
  parameters: {
    layout: 'padded',
  },
  title: 'Components/DateInput',
}

const Template = (props: DateInputProps) => {
  const [value, setValue] = useState(props.value || '')
  if (props.onChange === undefined) {
    props.onChange = (event) => setValue(event.target.value)
  }

  return (
    <>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '90vh',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <DateInput {...props} />
        <p style={{ color: 'white' }}>
          <b>Value:</b> {value}
        </p>
      </div>
    </>
  )
}

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  name: 'DateInput',
  onChange: undefined,
  size: 18,
  value: undefined,
  variant: Variant.PRIMARY,
}
