import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../components/spinner/Spinner.tsx'
import { Building } from '../../models/graphql/schema.ts'
import { BuildingFormStore } from '../../modules/infrastructure/BuildingForm/BuildingForm.store.ts'
import { BuildingForm } from '../../modules/infrastructure/BuildingForm/BuildingForm.tsx'
import { useServices } from '../../services/useServices.ts'
import loadingStore from '../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../styles/ts/containers.ts'
import { Error404Page } from '../Error404Page.tsx'
import { Layout } from '../Layout.tsx'

export function BuildingUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const name = searchParameters.get('name')
  const unit = searchParameters.get('unit')
  if (name === null) {
    return <Error404Page />
  }

  // Fetch data
  const [building, setBuilding] = useState<Building | null | undefined>()
  const [loading, setLoading] = useState(false)
  const { buildingService } = useServices()

  const fetchBuilding = useCallback(async () => {
    const buildingData = await buildingService.getBuilding({ name, unit })
    setBuilding(buildingData)
  }, [name, unit])
  useEffect(() => {
    setLoading(true)
    fetchBuilding().finally(() => setLoading(false))
  }, [fetchBuilding])

  // Render
  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  if (building === null || building === undefined) {
    return <Error404Page />
  }

  const buildingFormStore = new BuildingFormStore(building ?? undefined)
  return (
    <Layout>
      <BuildingForm building={building ?? undefined} buildingFormStore={buildingFormStore} edit loadingStore={loadingStore} />
    </Layout>
  )
}
