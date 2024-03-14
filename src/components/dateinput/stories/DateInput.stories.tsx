import { useState } from 'react'

import { Variant } from '../../../styles/ts/types.ts'
import { DateInput } from '../DateInput.tsx'
import { DateInputConfig } from '../DateInput.type.ts'

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

const Template = (config: DateInputConfig) => {
  const [value, setValue] = useState(config.value || '')
  if (config.onChange === undefined) {
    config.onChange = (event) => setValue(event.target.value)
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
        <DateInput config={config} />
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
