import { DivisionFormStore } from '../../../modules/formation/division/DivisionForm/DivisionForm.store.ts'
import { DivisionForm } from '../../../modules/formation/division/DivisionForm/DivisionForm.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { Layout } from '../../Layout.tsx'

export function DivisionCreatePage() {
  const divisionFormStore = new DivisionFormStore()
  return (
    <Layout>
      <DivisionForm divisionFormStore={divisionFormStore} loadingStore={loadingStore} />
    </Layout>
  )
}
