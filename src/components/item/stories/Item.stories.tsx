import { useState } from 'react'

import close from '../../../assets/close.svg'
import { Item } from '../Item.tsx'
import { ItemProps } from '../Item.types.ts'

export default {
  component: Item,
  parameters: {
    layout: 'padded',
  },
  title: 'Components/Item',
}

const Template = (props: ItemProps) => {
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
        <Item {...props} />
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
  image: close,
  size: 40,
  text: 'Item',
}
