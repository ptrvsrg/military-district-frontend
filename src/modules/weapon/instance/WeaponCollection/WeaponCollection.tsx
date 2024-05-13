import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../../components/table/Table.tsx'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { WeaponCollectionStore } from './WeaponCollection.store.ts'

type WeaponCollectionProps = {
  loadingStore: LoadingStore
  weaponCollectionStore: WeaponCollectionStore
}

export const WeaponCollection = observer((props: WeaponCollectionProps) => {
  const { t } = useTranslation()

  // Table
  const tableColumns: Column[] = [
    { label: <b>{t('serialNumber').toUpperCase()}</b> },
    { label: <b>{t('unit').toUpperCase()}</b> },
    { label: <b>{t('type').toUpperCase()}</b> },
  ]
  const tableData: ReactNode[][] = props.weaponCollectionStore.getWeapons().map((weapon) => {
    const equipmentInstanceUpdateLink = `/weapons/instances/update?serialNumber=${weapon.serialNumber}`
    const unitUpdateLink = `/formations/units/update?name=${weapon.unit?.name}`
    // eslint-disable-next-line sonarjs/no-nested-template-literals,max-len
    const typeUpdateLink = `/weapons/types/update?name=${weapon.type?.name}${weapon.type?.category.name ? `&category=${weapon.type?.category.name}` : ''}`

    return [
      <Link href={equipmentInstanceUpdateLink}>{weapon.serialNumber}</Link>,
      weapon.unit ? <Link href={unitUpdateLink}>{weapon.unit.name}</Link> : <p>{'—'}</p>,
      weapon.type ? <Link href={typeUpdateLink}>{weapon.type.name}</Link> : <p>{'—'}</p>,
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
        count={props.weaponCollectionStore.getWeaponCount()}
        data={tableData}
        onPage={(number) => props.weaponCollectionStore.setPage(number)}
        onPageSize={(number) => props.weaponCollectionStore.setPageSize(number)}
        page={props.weaponCollectionStore.getPage()}
        pageSize={props.weaponCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
