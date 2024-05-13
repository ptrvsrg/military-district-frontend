import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../../components/table/Table.tsx'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { UnitCollectionStore } from './UnitCollection.store.ts'

type UnitCollectionProps = {
  loadingStore: LoadingStore
  unitCollectionStore: UnitCollectionStore
}

export const UnitCollection = observer((props: UnitCollectionProps) => {
  const { t } = useTranslation()

  // Table
  const tableColumns: Column[] = [
    { label: <b>{t('name').toUpperCase()}</b> },
    { label: <b>{t('address').toUpperCase()}</b> },
    { label: <b>{t('coordinate').toUpperCase()}</b> },
    { label: <b>{t('commander').toUpperCase()}</b> },
    { label: <b>{t('companies').toUpperCase()}</b> },
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
  const tableData: ReactNode[][] = props.unitCollectionStore.getUnits().map((unit) => {
    return [
      <Link href={`/formations/units/update?name=${unit?.name || ''}`}>{unit?.name || '—'}</Link>,
      <p>
        {[
          unit?.address?.postCode,
          unit?.address?.country,
          unit?.address?.state,
          unit?.address?.locality,
          unit?.address?.street,
          unit?.address?.houseNumber,
        ].reduce((item1, item2) => (item1 ? `${item1}, ${item2}` : item2)) || '—'}
      </p>,
      <p>{unit?.coordinate ? `${unit?.coordinate?.lat}, ${unit?.coordinate?.lng}` : '—'}</p>,
      <Link href={`/militaries/update?mbn=${unit?.commander?.mbn || ''}`}>{unit?.commander?.mbn || '—'}</Link>,
      formationNamesToCell(unit?.companies.map((company) => company.name) ?? [], '/formations/companies/update'),
      formationNamesToCell(unit?.brigades.map((brigade) => brigade.name) ?? [], '/formations/brigades/update'),
      formationNamesToCell(unit?.corps.map((corps) => corps.name) ?? [], '/formations/corps/update'),
      formationNamesToCell(unit?.divisions.map((division) => division.name) ?? [], '/formations/divisions/update'),
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
        count={props.unitCollectionStore.getUnitCount()}
        data={tableData}
        onPage={(number) => props.unitCollectionStore.setPage(number)}
        onPageSize={(number) => props.unitCollectionStore.setPageSize(number)}
        page={props.unitCollectionStore.getPage()}
        pageSize={props.unitCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
