import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../../components/table/Table.tsx'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { CorpsCollectionStore } from './CorpsCollection.store.ts'

type CorpsCollectionProps = {
  corpsCollectionStore: CorpsCollectionStore
  loadingStore: LoadingStore
}

export const CorpsCollection = observer((props: CorpsCollectionProps) => {
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
  const tableData: ReactNode[][] = props.corpsCollectionStore.getCorps().map((corps) => {
    return [
      <Link href={`/formations/corps/update?name=${corps?.name || ''}`}>{corps?.name || '—'}</Link>,
      <Link href={`/militaries/update?mbn=${corps?.commander?.mbn || ''}`}>{corps?.commander?.mbn || '—'}</Link>,
      formationNamesToCell(corps?.units.map((unit) => unit.name) ?? [], '/formation/units/update'),
      formationNamesToCell(corps?.armies.map((army) => army.name) ?? [], '/formation/armies/update'),
    ]
  })

  if (props.loadingStore.loading) {
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
        count={props.corpsCollectionStore.getCorpsCount()}
        data={tableData}
        onPage={props.corpsCollectionStore.setPage}
        onPageSize={props.corpsCollectionStore.setPageSize}
        page={props.corpsCollectionStore.getPage()}
        pageSize={props.corpsCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
