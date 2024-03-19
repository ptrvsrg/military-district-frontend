import { OptionType } from '../../../components/select/Select.types.ts'
import { CreatableSelect } from '../CreatableSelect.tsx'
import { CreatableSelectProps } from '../CreatableSelect.types.ts'
import { CreatableSelectStore } from '../CreatableSelectStore.ts'

export default {
  component: CreatableSelect,
  parameters: {
    layout: 'centered',
  },
  title: 'Modules/CreatableSelect',
}

const Template = (props: CreatableSelectProps) => {
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

  props.loadOptions = (inputValue) => {
    console.log(inputValue)
    return new Promise<OptionType[]>((resolve) => {
      setTimeout(() => {
        resolve(options)
      }, 1000)
    })
  }

  const store = new CreatableSelectStore()
  props.onCreate = (attribute) => store.addAttribute(attribute)
  props.onDelete = (attribute) => store.removeAttribute(attribute)
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
        <CreatableSelect attributes={store.attributes} props={props} />
      </div>
    </>
  )
}

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  size: 18,
}
