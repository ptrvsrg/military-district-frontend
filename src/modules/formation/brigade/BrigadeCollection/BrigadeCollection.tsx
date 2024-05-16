import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../../components/table/Table.tsx'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { BrigadeCollectionStore } from './BrigadeCollection.store.ts'

type BrigadeCollectionProps = {
  brigadeCollectionStore: BrigadeCollectionStore
  loadingStore: LoadingStore
}

export const BrigadeCollection = observer((props: BrigadeCollectionProps) => {
  const { t } = useTranslation()

  // Table
  const tableColumns: Column[] = [
    { label: <b>{t('name').toUpperCase()}</b> },
    { label: <b>{t('commander').toUpperCase()}</b> },
    { label: <b>{t('units').toUpperCase()}</b> },
    { label: <b>{t('armies').toUpperCase()}</b> },
  ]
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const formationNamesToCell = (formationNames: string[], prefixLink: string) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'max-content',
        width: 'max-content',
      }}
    >
      {formationNames.length > 0 ? formationNames.sort().map((name) => <Link href={`${prefixLink}?name=${name}`}>{name}</Link>) : '—'}
    </div>
  )
  const tableData: ReactNode[][] = props.brigadeCollectionStore.getBrigades().map((brigade) => {
    return [
      <Link href={`/formations/brigades/update?name=${brigade?.name || ''}`}>{brigade?.name || '—'}</Link>,
      <Link href={`/militaries/update?mbn=${brigade?.commander?.mbn || ''}`}>{brigade?.commander?.mbn || '—'}</Link>,
      formationNamesToCell(brigade?.units.map((unit) => unit.name) ?? [], '/formations/units/update'),
      formationNamesToCell(brigade?.armies.map((army) => army.name) ?? [], '/formations/armies/update'),
    ]
  })

  if (props.loadingStore.getLoading()) {
    return (
      <SpinnerWrapper style={{ height: 400 }}>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  return (
    <RowWrapper>
      <Table
        columns={tableColumns}
        count={props.brigadeCollectionStore.getBrigadeCount()}
        data={tableData}
        onPage={props.brigadeCollectionStore.setPage}
        onPageSize={props.brigadeCollectionStore.setPageSize}
        page={props.brigadeCollectionStore.getPage()}
        pageSize={props.brigadeCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
