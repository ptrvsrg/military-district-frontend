import { useState } from 'react'

import plus from '../../../assets/plus.svg'
import { Variant } from '../../../styles/ts/types.ts'
import { InputWithAction } from '../Input.tsx'
import { InputWithActionConfig } from '../Input.type.ts'

export default {
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [Variant.PRIMARY],
    },
  },
  component: InputWithAction,
  parameters: {
    layout: 'padded',
  },
  title: 'Components/Input/InputWithAction',
}

const Template = (config: InputWithActionConfig) => {
  const [count, setCount] = useState(0)
  config.action = () => setCount(count + 1)

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
        <InputWithAction config={config} />
        <p style={{ color: 'white' }}>
          <b>Value:</b> {value}
        </p>
        <p style={{ color: 'white' }}>
          <b>Count:</b> {count}
        </p>
      </div>
    </>
  )
}

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  action: undefined,
  image: plus,
  name: 'InputWithAction',
  onChange: undefined,
  size: 18,
  value: undefined,
  variant: Variant.PRIMARY,
}
