import { UnitFormStore } from '../../../modules/formation/unit/UnitForm/UnitForm.store.ts'
import { UnitForm } from '../../../modules/formation/unit/UnitForm/UnitForm.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { Layout } from '../../Layout.tsx'

export function UnitCreatePage() {
  const unitFormStore = new UnitFormStore()
  return (
    <Layout>
      <UnitForm loadingStore={loadingStore} unitFormStore={unitFormStore} />
    </Layout>
  )
}
