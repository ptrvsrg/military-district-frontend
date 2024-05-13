import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../components/table/Table.tsx'
import { LoadingStore } from '../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { BuildingCollectionStore } from './BuildingCollection.store.ts'

type BuildingCollectionProps = {
  buildingCollectionStore: BuildingCollectionStore
  loadingStore: LoadingStore
}

export const BuildingCollection = observer((props: BuildingCollectionProps) => {
  const { t } = useTranslation()

  // Table
  const tableColumns: Column[] = [
    { label: <b>{t('name').toUpperCase()}</b> },
    { label: <b>{t('unit').toUpperCase()}</b> },
    { label: <b>{t('address').toUpperCase()}</b> },
    { label: <b>{t('coordinate').toUpperCase()}</b> },
    { label: <b>{t('companies').toUpperCase()}</b> },
    { label: <b>{t('platoons').toUpperCase()}</b> },
    { label: <b>{t('squads').toUpperCase()}</b> },
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
  const tableData: ReactNode[][] = props.buildingCollectionStore.getBuildings().map((building) => {
    return [
      building ? (
        // eslint-disable-next-line sonarjs/no-nested-template-literals
        <Link href={`/buildings/update?name=${building.name}${building.unit ? `&unit=${building.unit.name}` : ''}`}>{building.name}</Link>
      ) : (
        <p>{'—'}</p>
      ),
      building?.unit ? <Link href={`/formations/units/update?name=${building.unit.name}`}>{building.unit.name}</Link> : <p>{'—'}</p>,
      <p>
        {[
          building?.address?.postCode,
          building?.address?.country,
          building?.address?.state,
          building?.address?.locality,
          building?.address?.street,
          building?.address?.houseNumber,
        ].reduce((item1, item2) => (item1 ? `${item1}, ${item2}` : item2)) || '—'}
      </p>,
      <p>{building?.coordinate ? `${building?.coordinate?.lat}, ${building?.coordinate?.lng}` : '—'}</p>,
      formationNamesToCell(building?.companies.map((company) => company.name) ?? [], '/formations/companies/update'),
      formationNamesToCell(building?.platoons.map((platoon) => platoon.name) ?? [], '/formations/platoons/update'),
      formationNamesToCell(building?.squads.map((squad) => squad.name) ?? [], '/formations/squads/update'),
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
        count={props.buildingCollectionStore.getBuildingCount()}
        data={tableData}
        onPage={(number) => props.buildingCollectionStore.setPage(number)}
        onPageSize={(number) => props.buildingCollectionStore.setPageSize(number)}
        page={props.buildingCollectionStore.getPage()}
        pageSize={props.buildingCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
