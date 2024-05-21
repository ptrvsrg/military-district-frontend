import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../../components/table/Table.tsx'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { WeaponTypeCollectionStore } from './WeaponTypeCollection.store.ts'

type WeaponTypeCollectionProps = {
  loadingStore: LoadingStore
  weaponTypeCollectionStore: WeaponTypeCollectionStore
}

export const WeaponTypeCollection = observer((props: WeaponTypeCollectionProps) => {
  const { t } = useTranslation()

  // Table
  const tableColumns: Column[] = [{ label: <b>{t('name').toUpperCase()}</b> }, { label: <b>{t('category').toUpperCase()}</b> }]
  const tableData: ReactNode[][] = props.weaponTypeCollectionStore.getWeaponTypes().map((weaponType) => {
    const equipmentTypeUpdateLink = `/weapons/types/update?name=${weaponType.name}&category=${weaponType.category.name}`
    return [<Link href={equipmentTypeUpdateLink}>{weaponType.name}</Link>, <p>{weaponType.category.name}</p>]
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
        count={props.weaponTypeCollectionStore.getWeaponTypeCount()}
        data={tableData}
        onPage={(number) => props.weaponTypeCollectionStore.setPage(number)}
        onPageSize={(number) => props.weaponTypeCollectionStore.setPageSize(number)}
        page={props.weaponTypeCollectionStore.getPage()}
        pageSize={props.weaponTypeCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
