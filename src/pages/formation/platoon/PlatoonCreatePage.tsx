import { PlatoonFormStore } from '../../../modules/formation/platoon/PlatoonForm/PlatoonForm.store.ts'
import { PlatoonForm } from '../../../modules/formation/platoon/PlatoonForm/PlatoonForm.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { Layout } from '../../Layout.tsx'

export function PlatoonCreatePage() {
  const platoonFormStore = new PlatoonFormStore()
  return (
    <Layout>
      <PlatoonForm loadingStore={loadingStore} platoonFormStore={platoonFormStore} />
    </Layout>
  )
}
