import { useState } from 'react'

import { Variant } from '../../../styles/ts/types.ts'
import { Button } from '../Button.tsx'
import { ButtonConfig } from '../Button.types.ts'

export default {
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [Variant.PRIMARY, Variant.SECONDARY],
    },
  },
  component: Button,
  parameters: {
    layout: 'padded',
  },
  title: 'Components/Button',
}

const Template = (config: ButtonConfig) => {
  const [count, setCount] = useState(0)
  config.onClick = () => setCount(count + 1)

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
        <Button config={config} />
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
  disabled: false,
  outlined: false,
  size: 40,
  text: 'Button',
  variant: Variant.PRIMARY,
}
