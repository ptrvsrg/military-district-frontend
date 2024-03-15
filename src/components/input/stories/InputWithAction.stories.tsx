import { useState } from 'react'

import plus from '../../../assets/plus.svg'
import { Variant } from '../../../styles/ts/types.ts'
import { InputWithAction } from '../Input.tsx'
import { InputWithActionProps } from '../Input.type.ts'

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
  title: 'Components/Input',
}

const Template = (props: InputWithActionProps) => {
  const [count, setCount] = useState(0)
  props.action = () => setCount(count + 1)

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
        <InputWithAction {...props} />
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

export const WithAction = Template.bind({})
// @ts-ignore
WithAction.args = {
  action: undefined,
  image: plus,
  name: 'InputWithAction',
  onChange: undefined,
  size: 18,
  value: undefined,
  variant: Variant.PRIMARY,
}
