import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../components/table/Table.tsx'
import { LoadingStore } from '../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { MilitaryCollectionStore } from './MilitaryCollection.store.ts'

type MilitaryCollectionProps = {
  loadingStore: LoadingStore
  militaryCollectionStore: MilitaryCollectionStore
}

export const MilitaryCollection = observer((props: MilitaryCollectionProps) => {
  const { t } = useTranslation()

  // Table
  const tableColumns: Column[] = [
    { label: <b>{t('mbn').toUpperCase()}</b> },
    { label: <b>{t('lastName').toUpperCase()}</b> },
    { label: <b>{t('firstName').toUpperCase()}</b> },
    { label: <b>{t('middleName').toUpperCase()}</b> },
    { label: <b>{t('birthDate').toUpperCase()}</b> },
    { label: <b>{t('rank').toUpperCase()}</b> },
    { label: <b>{t('unit').toUpperCase()}</b> },
  ]
  const tableData: ReactNode[][] = props.militaryCollectionStore.getMilitaries().map((military) => {
    return [
      <Link href={`/militaries/update?mbn=${military?.mbn || ''}`}>{military?.mbn || ''}</Link>,
      <p>{military?.lastName || '—'}</p>,
      <p>{military?.firstName || '—'}</p>,
      <p>{military?.middleName || '—'}</p>,
      <p>{military?.birthDate || '—'}</p>,
      <p>{military?.rank?.name || '—'}</p>,
      <Link href={`/formations/units/update?name=${military?.unit?.name || '#'}`}>{military?.unit?.name || ''}</Link>,
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
        count={props.militaryCollectionStore.getMilitaryCount()}
        data={tableData}
        onPage={(number) => props.militaryCollectionStore.setPage(number)}
        onPageSize={(number) => props.militaryCollectionStore.setPageSize(number)}
        page={props.militaryCollectionStore.getPage()}
        pageSize={props.militaryCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
