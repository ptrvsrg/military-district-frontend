import weaponCollectionStore from '../../../modules/weapon/instance/WeaponCollection/WeaponCollection.store.ts'
import { WeaponCollection } from '../../../modules/weapon/instance/WeaponCollection/WeaponCollection.tsx'
import weaponFilterStore from '../../../modules/weapon/instance/WeaponFilter/WeaponFilter.store.ts'
import { WeaponFilter } from '../../../modules/weapon/instance/WeaponFilter/WeaponFilter.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { ColumnContent } from '../../../styles/ts/containers.ts'

export function WeaponPage() {
  return (
    <ColumnContent>
      <WeaponFilter loadingStore={loadingStore} weaponCollectionStore={weaponCollectionStore} weaponFilterStore={weaponFilterStore} />
      <WeaponCollection loadingStore={loadingStore} weaponCollectionStore={weaponCollectionStore} />
    </ColumnContent>
  )
}
