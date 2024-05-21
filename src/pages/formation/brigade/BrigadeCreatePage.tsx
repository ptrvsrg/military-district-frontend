import { BrigadeFormStore } from '../../../modules/formation/brigade/BrigadeForm/BrigadeForm.store.ts'
import { BrigadeForm } from '../../../modules/formation/brigade/BrigadeForm/BrigadeForm.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { Layout } from '../../Layout.tsx'

export function BrigadeCreatePage() {
  const brigadeFormStore = new BrigadeFormStore()
  return (
    <Layout>
      <BrigadeForm brigadeFormStore={brigadeFormStore} loadingStore={loadingStore} />
    </Layout>
  )
}
