import { WeaponFormStore } from '../../../modules/weapon/instance/WeaponForm/WeaponForm.store.ts'
import { WeaponForm } from '../../../modules/weapon/instance/WeaponForm/WeaponForm.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { Layout } from '../../Layout.tsx'

export function WeaponCreatePage() {
  const weaponFormStore = new WeaponFormStore()
  return (
    <Layout>
      <WeaponForm loadingStore={loadingStore} weaponFormStore={weaponFormStore} />
    </Layout>
  )
}
