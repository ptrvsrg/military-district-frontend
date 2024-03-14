import { useState } from 'react'
import { SingleValue } from 'react-select'

import { AsyncSelect } from '../Select.tsx'
import { AsyncSelectConfig, OptionType } from '../Select.types.ts'

export default {
  component: AsyncSelect,
  parameters: {
    layout: 'padded',
  },
  title: 'Components/Select/AsyncSelect',
}

const Template = (config: AsyncSelectConfig) => {
  const [value, setValue] = useState<SingleValue<OptionType> | null>(null)
  const options: OptionType[] = [
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
  if (config.loadOptions) {
    config.loadOptions = (inputValue) => {
      console.log(inputValue)
      return new Promise<OptionType[]>((resolve) => {
        setTimeout(() => {
          resolve(options)
        }, 1000)
      })
    }
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
        <AsyncSelect config={config} />
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
  loadOptions: () => {},
  onChange: () => {},
  size: 18,
}
