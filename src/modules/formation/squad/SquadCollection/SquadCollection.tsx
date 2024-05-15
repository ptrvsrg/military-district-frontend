import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../../components/table/Table.tsx'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { SquadCollectionStore } from './SquadCollection.store.ts'

type SquadCollectionProps = {
  loadingStore: LoadingStore
  squadCollectionStore: SquadCollectionStore
}

export const SquadCollection = observer((props: SquadCollectionProps) => {
  const { t } = useTranslation()

  // Table
  const tableColumns: Column[] = [
    { label: <b>{t('name').toUpperCase()}</b> },
    { label: <b>{t('commander').toUpperCase()}</b> },
    { label: <b>{t('platoon').toUpperCase()}</b> },
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
  const tableData: ReactNode[][] = props.squadCollectionStore.getSquads().map((squad) => {
    return [
      <Link href={`/formations/squads/update?name=${squad?.name || ''}`}>{squad?.name || '—'}</Link>,
      <Link href={`/militaries/update?mbn=${squad?.commander?.mbn || ''}`}>{squad?.commander?.mbn || '—'}</Link>,
      formationNamesToCell((squad?.platoon ? [squad?.platoon] : []).map((company) => company.name) ?? [], '/formations/platoons/update'),
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
        count={props.squadCollectionStore.getSquadCount()}
        data={tableData}
        onPage={(number) => props.squadCollectionStore.setPage(number)}
        onPageSize={(number) => props.squadCollectionStore.setPageSize(number)}
        page={props.squadCollectionStore.getPage()}
        pageSize={props.squadCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
