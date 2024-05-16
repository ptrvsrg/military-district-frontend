import { useCallback, useEffect, useState } from 'react'
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
  const [loading, setLoading] = useState(false)
  const { combatEquipmentTypeService } = useServices()

  const fetchCombatEquipmentType = useCallback(async () => {
    const combatEquipmentTypeData = await combatEquipmentTypeService.getCombatEquipmentType({ category, name })
    setCombatEquipmentType(combatEquipmentTypeData)
  }, [category, name])
  useEffect(() => {
    setLoading(true)
    fetchCombatEquipmentType().finally(() => setLoading(false))
  }, [fetchCombatEquipmentType])

  // Render
  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  if (combatEquipmentType === null || combatEquipmentType === undefined) {
    return <Error404Page />
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
