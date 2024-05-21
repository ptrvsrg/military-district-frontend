import { SquadFormStore } from '../../../modules/formation/squad/SquadForm/SquadForm.store.ts'
import { SquadForm } from '../../../modules/formation/squad/SquadForm/SquadForm.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { Layout } from '../../Layout.tsx'

export function SquadCreatePage() {
  const squadFormStore = new SquadFormStore()
  return (
    <Layout>
      <SquadForm loadingStore={loadingStore} squadFormStore={squadFormStore} />
    </Layout>
  )
}
