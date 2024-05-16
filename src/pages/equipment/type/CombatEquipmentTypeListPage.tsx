// eslint-disable-next-line max-len
import combatEquipmentTypeCollectionStore from '../../../modules/equipment/type/CombatEquipmentTypeCollection/CombatEquipmentTypeCollection.store.ts'
import { CombatEquipmentTypeCollection } from '../../../modules/equipment/type/CombatEquipmentTypeCollection/CombatEquipmentTypeCollection.tsx'
import combatEquipmentTypeFilterStore from '../../../modules/equipment/type/CombatEquipmentTypeFilter/CombatEquipmentTypeFilter.store.ts'
import { CombatEquipmentTypeFilter } from '../../../modules/equipment/type/CombatEquipmentTypeFilter/CombatEquipmentTypeFilter.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { ColumnContent } from '../../../styles/ts/containers.ts'

export function CombatEquipmentTypePage() {
  return (
    <ColumnContent>
      <CombatEquipmentTypeFilter
        combatEquipmentTypeCollectionStore={combatEquipmentTypeCollectionStore}
        combatEquipmentTypeFilterStore={combatEquipmentTypeFilterStore}
        loadingStore={loadingStore}
      />
      <CombatEquipmentTypeCollection combatEquipmentTypeCollectionStore={combatEquipmentTypeCollectionStore} loadingStore={loadingStore} />
    </ColumnContent>
  )
}
