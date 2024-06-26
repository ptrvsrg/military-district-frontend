import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Weapon } from '../../../models/graphql/schema.ts'
import { WeaponFormStore } from '../../../modules/weapon/instance/WeaponForm/WeaponForm.store.ts'
import { WeaponForm } from '../../../modules/weapon/instance/WeaponForm/WeaponForm.tsx'
import { useServices } from '../../../services/useServices.ts'
import loadingStore from '../../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { Error404Page } from '../../Error404Page.tsx'
import { Layout } from '../../Layout.tsx'

export function WeaponUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const serialNumber = searchParameters.get('serialNumber')
  if (serialNumber === null) {
    return <Error404Page />
  }

  // Fetch data
  const [weapon, setWeapon] = useState<Weapon | null | undefined>()
  const [loading, setLoading] = useState(false)
  const { weaponService } = useServices()

  const fetchWeapon = useCallback(async () => {
    const weaponData = await weaponService.getWeapon({ serialNumber })
    setWeapon(weaponData)
  }, [serialNumber])
  useEffect(() => {
    setLoading(true)
    fetchWeapon().finally(() => setLoading(false))
  }, [fetchWeapon])

  // Render
  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  if (weapon === null || weapon === undefined) {
    return <Error404Page />
  }

  const weaponFormStore = new WeaponFormStore(weapon ?? undefined)
  return (
    <Layout>
      <WeaponForm edit loadingStore={loadingStore} weapon={weapon ?? undefined} weaponFormStore={weaponFormStore} />
    </Layout>
  )
}
