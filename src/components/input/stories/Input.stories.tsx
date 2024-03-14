import { useState } from 'react'

import { Variant } from '../../../styles/ts/types.ts'
import { Input } from '../Input.tsx'
import { InputConfig } from '../Input.type.ts'

export default {
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [Variant.PRIMARY],
    },
  },
  component: Input,
  parameters: {
    layout: 'padded',
  },
  title: 'Components/Input/Input',
}

const Template = (config: InputConfig) => {
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
        <Input config={config} />
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
  name: 'input',
  onChange: undefined,
  size: 18,
  value: undefined,
  variant: Variant.PRIMARY,
}
