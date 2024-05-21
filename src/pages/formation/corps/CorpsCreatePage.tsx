import { CorpsFormStore } from '../../../modules/formation/corps/CorpsForm/CorpsForm.store.ts'
import { CorpsForm } from '../../../modules/formation/corps/CorpsForm/CorpsForm.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { Layout } from '../../Layout.tsx'

export function CorpsCreatePage() {
  const corpsFormStore = new CorpsFormStore()
  return (
    <Layout>
      <CorpsForm corpsFormStore={corpsFormStore} loadingStore={loadingStore} />
    </Layout>
  )
}
