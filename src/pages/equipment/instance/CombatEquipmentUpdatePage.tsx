import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { CombatEquipment } from '../../../models/graphql/schema.ts'
import { CombatEquipmentFormStore } from '../../../modules/equipment/instance/CombatEquipmentForm/CombatEquipmentForm.store.ts'
import { CombatEquipmentForm } from '../../../modules/equipment/instance/CombatEquipmentForm/CombatEquipmentForm.tsx'
import { useServices } from '../../../services/useServices.ts'
import loadingStore from '../../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { Error404Page } from '../../Error404Page.tsx'
import { Layout } from '../../Layout.tsx'

export function CombatEquipmentUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const serialNumber = searchParameters.get('serialNumber')
  if (serialNumber === null) {
    return <Error404Page />
  }

  // Fetch data
  const [combatEquipment, setCombatEquipment] = useState<CombatEquipment | null | undefined>()
  const { combatEquipmentService } = useServices()

  useEffect(() => {
    const fetchData = async () => {
      loadingStore.setLoading(true)
      const combatEquipmentData = await combatEquipmentService.getCombatEquipment({ serialNumber })
      setCombatEquipment(combatEquipmentData)
      loadingStore.setLoading(false)
    }

    fetchData()
  }, [])

  if (!loadingStore.getLoading() && (combatEquipment === null || combatEquipment === undefined)) {
    return <Error404Page />
  }

  if (loadingStore.getLoading()) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  const combatEquipmentFormStore = new CombatEquipmentFormStore(combatEquipment ?? undefined)
  return (
    <Layout>
      <CombatEquipmentForm
        combatEquipment={combatEquipment ?? undefined}
        combatEquipmentFormStore={combatEquipmentFormStore}
        edit
        loadingStore={loadingStore}
      />
    </Layout>
  )
}
