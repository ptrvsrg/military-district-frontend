// eslint-disable-next-line max-len
import weaponTypeCollectionStore from '../../../modules/weapon/type/WeaponTypeCollection/WeaponTypeCollection.store.ts'
import { WeaponTypeCollection } from '../../../modules/weapon/type/WeaponTypeCollection/WeaponTypeCollection.tsx'
import weaponTypeFilterStore from '../../../modules/weapon/type/WeaponTypeFilter/WeaponTypeFilter.store.ts'
import { WeaponTypeFilter } from '../../../modules/weapon/type/WeaponTypeFilter/WeaponTypeFilter.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { ColumnContent } from '../../../styles/ts/containers.ts'

export function WeaponTypePage() {
  return (
    <ColumnContent>
      <WeaponTypeFilter
        loadingStore={loadingStore}
        weaponTypeCollectionStore={weaponTypeCollectionStore}
        weaponTypeFilterStore={weaponTypeFilterStore}
      />
      <WeaponTypeCollection loadingStore={loadingStore} weaponTypeCollectionStore={weaponTypeCollectionStore} />
    </ColumnContent>
  )
}
