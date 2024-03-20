import { useState } from 'react'

import { Button } from '../../../components/button/Button.tsx'
import { ButtonProps } from '../../../components/button/Button.types.ts'
import { Variant } from '../../../styles/ts/types.ts'

export default {
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: Object.values(Variant),
    },
  },
  component: Button,
  parameters: {
    layout: 'padded',
  },
  title: 'Components/Button',
}

const Template = (props: ButtonProps) => {
  const [count, setCount] = useState(0)
  props.onClick = () => setCount(count + 1)

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
        <Button {...props} />
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
