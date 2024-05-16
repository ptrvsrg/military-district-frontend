import { WeaponTypeFormStore } from '../../../modules/weapon/type/WeaponTypeForm/WeaponTypeForm.store.ts'
import { WeaponTypeForm } from '../../../modules/weapon/type/WeaponTypeForm/WeaponTypeForm.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { Layout } from '../../Layout.tsx'

export function WeaponTypeCreatePage() {
  const weaponTypeFormStore = new WeaponTypeFormStore()
  return (
    <Layout>
      <WeaponTypeForm loadingStore={loadingStore} weaponTypeFormStore={weaponTypeFormStore} />
    </Layout>
  )
}
