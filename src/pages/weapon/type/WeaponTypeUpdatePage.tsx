import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { WeaponType } from '../../../models/graphql/schema.ts'
import { WeaponTypeFormStore } from '../../../modules/weapon/type/WeaponTypeForm/WeaponTypeForm.store.ts'
import { WeaponTypeForm } from '../../../modules/weapon/type/WeaponTypeForm/WeaponTypeForm.tsx'
import { useServices } from '../../../services/useServices.ts'
import loadingStore from '../../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { Error404Page } from '../../Error404Page.tsx'
import { Layout } from '../../Layout.tsx'

export function WeaponTypeUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const name = searchParameters.get('name')
  const category = searchParameters.get('category')
  if (name === null || category === null) {
    return <Error404Page />
  }

  // Fetch data
  const [weaponType, setWeaponType] = useState<WeaponType | null | undefined>()
  const { weaponTypeService } = useServices()

  useEffect(() => {
    const fetchData = async () => {
      loadingStore.setLoading(true)
      const weaponTypeData = await weaponTypeService.getWeaponType({ category, name })
      setWeaponType(weaponTypeData)
      loadingStore.setLoading(false)
    }

    fetchData()
  }, [])

  if (!loadingStore.getLoading() && (weaponType === null || weaponType === undefined)) {
    return <Error404Page />
  }

  if (loadingStore.getLoading()) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  const weaponTypeFormStore = new WeaponTypeFormStore(weaponType ?? undefined)
  return (
    <Layout>
      <WeaponTypeForm edit loadingStore={loadingStore} weaponType={weaponType ?? undefined} weaponTypeFormStore={weaponTypeFormStore} />
    </Layout>
  )
}
