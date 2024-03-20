import { useState } from 'react'

import { Button } from '../../../components/button/Button.tsx'
import { Modal, ModalProps } from '../../../components/modal/Modal.tsx'
import { Variant } from '../../../styles/ts/types.ts'

export default {
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Modal',
}

const Template = (props: ModalProps) => {
  const [show, setShow] = useState(true)
  props.show = show
  const onClick = () => setShow(!show)

  return (
    <Modal {...props}>
      <Button onClick={onClick} outlined size={18} text={'Close'} variant={Variant.SECONDARY} />
    </Modal>
  )
}

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  show: true,
}
