import combatEquipmentCollectionStore from '../../../modules/equipment/instance/CombatEquipmentCollection/CombatEquipmentCollection.store.ts'
import { CombatEquipmentCollection } from '../../../modules/equipment/instance/CombatEquipmentCollection/CombatEquipmentCollection.tsx'
import combatEquipmentFilterStore from '../../../modules/equipment/instance/CombatEquipmentFilter/CombatEquipmentFilter.store.ts'
import { CombatEquipmentFilter } from '../../../modules/equipment/instance/CombatEquipmentFilter/CombatEquipmentFilter.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { ColumnContent } from '../../../styles/ts/containers.ts'

export function CombatEquipmentPage() {
  return (
    <ColumnContent>
      <CombatEquipmentFilter
        combatEquipmentCollectionStore={combatEquipmentCollectionStore}
        combatEquipmentFilterStore={combatEquipmentFilterStore}
        loadingStore={loadingStore}
      />
      <CombatEquipmentCollection combatEquipmentCollectionStore={combatEquipmentCollectionStore} loadingStore={loadingStore} />
    </ColumnContent>
  )
}
