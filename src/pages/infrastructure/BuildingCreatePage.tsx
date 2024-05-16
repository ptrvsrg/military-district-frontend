import { BuildingFormStore } from '../../modules/infrastructure/BuildingForm/BuildingForm.store.ts'
import { BuildingForm } from '../../modules/infrastructure/BuildingForm/BuildingForm.tsx'
import loadingStore from '../../stores/LoadingStore.ts'
import { Layout } from '../Layout.tsx'

export function BuildingCreatePage() {
  const buildingFormStore = new BuildingFormStore()
  return (
    <Layout>
      <BuildingForm buildingFormStore={buildingFormStore} loadingStore={loadingStore} />
    </Layout>
  )
}
