import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../../components/table/Table.tsx'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { ArmyCollectionStore } from './ArmyCollection.store.ts'

type ArmyCollectionProps = {
  armyCollectionStore: ArmyCollectionStore
  loadingStore: LoadingStore
}

export const ArmyCollection = observer((props: ArmyCollectionProps) => {
  const { t } = useTranslation()

  // Table
  const tableColumns: Column[] = [
    { label: <b>{t('name').toUpperCase()}</b> },
    { label: <b>{t('commander').toUpperCase()}</b> },
    { label: <b>{t('brigades').toUpperCase()}</b> },
    { label: <b>{t('corps').toUpperCase()}</b> },
    { label: <b>{t('divisions').toUpperCase()}</b> },
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
  const tableData: ReactNode[][] = props.armyCollectionStore.getArmies().map((army) => {
    return [
      <Link href={`/formations/armies/update?name=${army?.name || ''}`}>{army?.name || '—'}</Link>,
      <Link href={`/militaries/update?mbn=${army?.commander?.mbn || ''}`}>{army?.commander?.mbn || '—'}</Link>,
      formationNamesToCell(army?.brigades.map((brigade) => brigade.name) ?? [], '/formations/brigades/update'),
      formationNamesToCell(army?.corps.map((corps) => corps.name) ?? [], '/formations/corps/update'),
      formationNamesToCell(army?.divisions.map((division) => division.name) ?? [], '/formations/divisions/update'),
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
        count={props.armyCollectionStore.getArmyCount()}
        data={tableData}
        onPage={(number) => props.armyCollectionStore.setPage(number)}
        onPageSize={(number) => props.armyCollectionStore.setPageSize(number)}
        page={props.armyCollectionStore.getPage()}
        pageSize={props.armyCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
