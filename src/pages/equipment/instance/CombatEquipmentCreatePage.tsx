import { CombatEquipmentFormStore } from '../../../modules/equipment/instance/CombatEquipmentForm/CombatEquipmentForm.store.ts'
import { CombatEquipmentForm } from '../../../modules/equipment/instance/CombatEquipmentForm/CombatEquipmentForm.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { Layout } from '../../Layout.tsx'

export function CombatEquipmentCreatePage() {
  const combatEquipmentFormStore = new CombatEquipmentFormStore()
  return (
    <Layout>
      <CombatEquipmentForm combatEquipmentFormStore={combatEquipmentFormStore} loadingStore={loadingStore} />
    </Layout>
  )
}
