import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { CombatEquipmentType } from '../../../models/graphql/schema.ts'
import { CombatEquipmentTypeFormStore } from '../../../modules/equipment/type/CombatEquipmentTypeForm/CombatEquipmentTypeForm.store.ts'
import { CombatEquipmentTypeForm } from '../../../modules/equipment/type/CombatEquipmentTypeForm/CombatEquipmentTypeForm.tsx'
import { useServices } from '../../../services/useServices.ts'
import loadingStore from '../../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { Error404Page } from '../../Error404Page.tsx'
import { Layout } from '../../Layout.tsx'

export function CombatEquipmentTypeUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const name = searchParameters.get('name')
  const category = searchParameters.get('category')
  if (name === null || category === null) {
    return <Error404Page />
  }

  // Fetch data
  const [combatEquipmentType, setCombatEquipmentType] = useState<CombatEquipmentType | null | undefined>()
  const { combatEquipmentTypeService } = useServices()

  useEffect(() => {
    const fetchData = async () => {
      loadingStore.setLoading(true)
      const combatEquipmentTypeData = await combatEquipmentTypeService.getCombatEquipmentType({ category, name })
      setCombatEquipmentType(combatEquipmentTypeData)
      loadingStore.setLoading(false)
    }

    fetchData()
  }, [])

  if (!loadingStore.getLoading() && (combatEquipmentType === null || combatEquipmentType === undefined)) {
    return <Error404Page />
  }

  if (loadingStore.getLoading()) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  const combatEquipmentTypeFormStore = new CombatEquipmentTypeFormStore(combatEquipmentType ?? undefined)
  return (
    <Layout>
      <CombatEquipmentTypeForm
        combatEquipmentType={combatEquipmentType ?? undefined}
        combatEquipmentTypeFormStore={combatEquipmentTypeFormStore}
        edit
        loadingStore={loadingStore}
      />
    </Layout>
  )
}
