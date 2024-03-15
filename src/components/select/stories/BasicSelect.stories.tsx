import { useState } from 'react'
import { SingleValue } from 'react-select'

import { BasicSelect } from '../Select.tsx'
import { BasicSelectConfig, OptionType } from '../Select.types.ts'

export default {
  component: BasicSelect,
  parameters: {
    layout: 'padded',
  },
  title: 'Components/Select/BasicSelect',
}

const Template = (config: BasicSelectConfig) => {
  const [value, setValue] = useState<SingleValue<OptionType> | null>(null)
  config.options = [
    {
      label: 'Value 1',
      value: 'value1',
    },
    {
      label: 'Value 2',
      value: 'value2',
    },
    {
      label: 'Value 3',
      value: 'value3',
    },
  ]

  if (config.onChange) {
    // @ts-ignore
    config.onChange = (event) => setValue(event)
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
        <BasicSelect config={config} />
        <p style={{ color: 'white' }}>
          <b>Value:</b> {value ? value.value : 'null'}
        </p>
      </div>
    </>
  )
}

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  isDisabled: false,
  onChange: () => {},
  size: 24,
}