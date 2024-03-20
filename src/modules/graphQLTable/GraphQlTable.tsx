import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { Button } from '../../components/button/Button.tsx'
import { Modal } from '../../components/modal/Modal.tsx'
import Table from '../../components/table/Table.tsx'
import { HeaderText, PlainText } from '../../components/text/Text.tsx'
import LoaderPage from '../../pages/LoaderPage.tsx'
import { Variant } from '../../styles/ts/types.ts'
import { GraphQLTableProps } from './GraphQlTable.types.ts'

export default function GraphQlTable(props: GraphQLTableProps) {
  const [showError, setShowError] = useState(false)
  const onCloseError = () => setShowError(!showError)
  const { data, error, loading } = useQuery(props.query)

  if (loading) return <LoaderPage />
  if (error) setShowError(true)

  return (
    <>
      <Table columns={props.columns} data={{ nodes: data }} />
      <Modal show={showError}>
        <HeaderText size={32} text={error?.name || ''} />
        <PlainText size={18} text={error?.message || ''} />
        <Button onClick={onCloseError} outlined size={18} text={'Close'} variant={Variant.SECONDARY} />
      </Modal>
    </>
  )
}
