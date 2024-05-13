import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../../components/table/Table.tsx'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { PlatoonCollectionStore } from './PlatoonCollection.store.ts'

type PlatoonCollectionProps = {
  loadingStore: LoadingStore
  platoonCollectionStore: PlatoonCollectionStore
}

export const PlatoonCollection = observer((props: PlatoonCollectionProps) => {
  const { t } = useTranslation()

  // Table
  const tableColumns: Column[] = [
    { label: <b>{t('name').toUpperCase()}</b> },
    { label: <b>{t('commander').toUpperCase()}</b> },
    { label: <b>{t('company').toUpperCase()}</b> },
    { label: <b>{t('squad').toUpperCase()}</b> },
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
  const tableData: ReactNode[][] = props.platoonCollectionStore.getPlatoons().map((platoon) => {
    return [
      <Link href={`/formations/platoons/update?name=${platoon?.name || ''}`}>{platoon?.name || '—'}</Link>,
      <Link href={`/militaries/update?mbn=${platoon?.commander?.mbn || ''}`}>{platoon?.commander?.mbn || '—'}</Link>,
      formationNamesToCell((platoon?.company ? [platoon?.company] : []).map((company) => company.name) ?? [], '/formation/companies/update'),
      formationNamesToCell(platoon?.squads.map((squad) => squad.name) ?? [], '/formation/squads/update'),
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
        count={props.platoonCollectionStore.getPlatoonCount()}
        data={tableData}
        onPage={(number) => props.platoonCollectionStore.setPage(number)}
        onPageSize={(number) => props.platoonCollectionStore.setPageSize(number)}
        page={props.platoonCollectionStore.getPage()}
        pageSize={props.platoonCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
