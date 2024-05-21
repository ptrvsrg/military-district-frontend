import { MilitaryFormStore } from '../../modules/military/MilitaryForm/MilitaryForm.store.ts'
import { MilitaryForm } from '../../modules/military/MilitaryForm/MilitaryForm.tsx'
import loadingStore from '../../stores/LoadingStore.ts'
import { Layout } from '../Layout.tsx'

export function MilitaryCreatePage() {
  const militaryFormStore = new MilitaryFormStore()
  return (
    <Layout>
      <MilitaryForm loadingStore={loadingStore} militaryFormStore={militaryFormStore} />
    </Layout>
  )
}
