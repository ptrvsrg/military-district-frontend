import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../../components/table/Table.tsx'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { CombatEquipmentTypeCollectionStore } from './CombatEquipmentTypeCollection.store.ts'

type CombatEquipmentTypeCollectionProps = {
  combatEquipmentTypeCollectionStore: CombatEquipmentTypeCollectionStore
  loadingStore: LoadingStore
}

export const CombatEquipmentTypeCollection = observer((props: CombatEquipmentTypeCollectionProps) => {
  const { t } = useTranslation()

  // Table
  const tableColumns: Column[] = [{ label: <b>{t('name').toUpperCase()}</b> }, { label: <b>{t('category').toUpperCase()}</b> }]
  const tableData: ReactNode[][] = props.combatEquipmentTypeCollectionStore.getCombatEquipmentTypes().map((combatEquipmentType) => {
    const equipmentTypeUpdateLink = `/equipments/types/update?name=${combatEquipmentType.name}&category=${combatEquipmentType.category.name}`
    return [<Link href={equipmentTypeUpdateLink}>{combatEquipmentType.name}</Link>, <p>{combatEquipmentType.category.name}</p>]
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
        count={props.combatEquipmentTypeCollectionStore.getCombatEquipmentTypeCount()}
        data={tableData}
        onPage={(number) => props.combatEquipmentTypeCollectionStore.setPage(number)}
        onPageSize={(number) => props.combatEquipmentTypeCollectionStore.setPageSize(number)}
        page={props.combatEquipmentTypeCollectionStore.getPage()}
        pageSize={props.combatEquipmentTypeCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
