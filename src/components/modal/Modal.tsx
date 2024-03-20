import { ReactNode } from 'react'
import styled from 'styled-components'

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
`

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: white;
  width: 30%;
  height: 30%;
  padding: 20px;
`

export interface ModalProps {
  children: ReactNode
  show: boolean
}

export function Modal(props: ModalProps) {
  if (!props.show) {
    return null
  }

  return (
    <ModalWrapper>
      <ModalContent>{props.children}</ModalContent>
    </ModalWrapper>
  )
}
