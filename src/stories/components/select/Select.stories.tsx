import { useState } from 'react'
import { SingleValue } from 'react-select'

import { Select } from '../../../components/select/Select.tsx'
import { AsyncSelectProps, OptionType } from '../../../components/select/Select.types.ts'

export default {
  component: Select,
  parameters: {
    layout: 'padded',
  },
  title: 'Components/Select',
}

const Template = (props: AsyncSelectProps) => {
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

  if (props.onChange) {
    // @ts-ignore
    props.onChange = (event) => setValue(event)
  }
  if (props.loadOptions) {
    props.loadOptions = (inputValue) => {
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
        <Select {...props} />
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
  outlined: true,
  placeholder: 'Select...',
  size: 18,
}
