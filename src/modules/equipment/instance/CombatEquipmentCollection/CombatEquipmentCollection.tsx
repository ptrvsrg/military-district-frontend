import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../../components/table/Table.tsx'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { CombatEquipmentCollectionStore } from './CombatEquipmentCollection.store.ts'

type CombatEquipmentCollectionProps = {
  combatEquipmentCollectionStore: CombatEquipmentCollectionStore
  loadingStore: LoadingStore
}

export const CombatEquipmentCollection = observer((props: CombatEquipmentCollectionProps) => {
  const { t } = useTranslation()

  // Table
  const tableColumns: Column[] = [
    { label: <b>{t('serialNumber').toUpperCase()}</b> },
    { label: <b>{t('unit').toUpperCase()}</b> },
    { label: <b>{t('type').toUpperCase()}</b> },
  ]
  const tableData: ReactNode[][] = props.combatEquipmentCollectionStore.getCombatEquipments().map((combatEquipment) => {
    const equipmentInstanceUpdateLink = `/equipments/instances/update?serialNumber=${combatEquipment.serialNumber}`
    const unitUpdateLink = `/formations/units/update?name=${combatEquipment.unit?.name}`
    // eslint-disable-next-line sonarjs/no-nested-template-literals,max-len
    const typeUpdateLink = `/equipments/types/update?name=${combatEquipment.type?.name}${combatEquipment.type?.category.name ? `&category=${combatEquipment.type?.category.name}` : ''}`

    return [
      <Link href={equipmentInstanceUpdateLink}>{combatEquipment.serialNumber}</Link>,
      combatEquipment.unit ? <Link href={unitUpdateLink}>{combatEquipment.unit.name}</Link> : <p>{'—'}</p>,
      combatEquipment.type ? <Link href={typeUpdateLink}>{combatEquipment.type.name}</Link> : <p>{'—'}</p>,
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
        count={props.combatEquipmentCollectionStore.getCombatEquipmentCount()}
        data={tableData}
        onPage={(number) => props.combatEquipmentCollectionStore.setPage(number)}
        onPageSize={(number) => props.combatEquipmentCollectionStore.setPageSize(number)}
        page={props.combatEquipmentCollectionStore.getPage()}
        pageSize={props.combatEquipmentCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
