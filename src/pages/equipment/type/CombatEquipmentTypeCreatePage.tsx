import { CombatEquipmentTypeFormStore } from '../../../modules/equipment/type/CombatEquipmentTypeForm/CombatEquipmentTypeForm.store.ts'
import { CombatEquipmentTypeForm } from '../../../modules/equipment/type/CombatEquipmentTypeForm/CombatEquipmentTypeForm.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { Layout } from '../../Layout.tsx'

export function CombatEquipmentTypeCreatePage() {
  const combatEquipmentTypeFormStore = new CombatEquipmentTypeFormStore()
  return (
    <Layout>
      <CombatEquipmentTypeForm combatEquipmentTypeFormStore={combatEquipmentTypeFormStore} loadingStore={loadingStore} />
    </Layout>
  )
}
