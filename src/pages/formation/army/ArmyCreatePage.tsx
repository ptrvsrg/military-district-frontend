import { ArmyFormStore } from '../../../modules/formation/army/ArmyForm/ArmyForm.store.ts'
import { ArmyForm } from '../../../modules/formation/army/ArmyForm/ArmyForm.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { Layout } from '../../Layout.tsx'

export function ArmyCreatePage() {
  const armyFormStore = new ArmyFormStore()
  return (
    <Layout>
      <ArmyForm armyFormStore={armyFormStore} loadingStore={loadingStore} />
    </Layout>
  )
}
