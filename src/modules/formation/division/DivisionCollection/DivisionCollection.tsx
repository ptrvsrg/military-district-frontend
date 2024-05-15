import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../../components/table/Table.tsx'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { DivisionCollectionStore } from './DivisionCollection.store.ts'

type DivisionCollectionProps = {
  divisionCollectionStore: DivisionCollectionStore
  loadingStore: LoadingStore
}

export const DivisionCollection = observer((props: DivisionCollectionProps) => {
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
  const tableData: ReactNode[][] = props.divisionCollectionStore.getDivisions().map((division) => {
    return [
      <Link href={`/formations/divisions/update?name=${division?.name || ''}`}>{division?.name || '—'}</Link>,
      <Link href={`/militaries/update?mbn=${division?.commander?.mbn || ''}`}>{division?.commander?.mbn || '—'}</Link>,
      formationNamesToCell(division?.units.map((unit) => unit.name) ?? [], '/formations/units/update'),
      formationNamesToCell(division?.armies.map((army) => army.name) ?? [], '/formations/armies/update'),
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
        count={props.divisionCollectionStore.getDivisionCount()}
        data={tableData}
        onPage={props.divisionCollectionStore.setPage}
        onPageSize={props.divisionCollectionStore.setPageSize}
        page={props.divisionCollectionStore.getPage()}
        pageSize={props.divisionCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
