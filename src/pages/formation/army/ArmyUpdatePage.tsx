import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Army } from '../../../models/graphql/schema.ts'
import { ArmyFormStore } from '../../../modules/formation/army/ArmyForm/ArmyForm.store.ts'
import { ArmyForm } from '../../../modules/formation/army/ArmyForm/ArmyForm.tsx'
import { useServices } from '../../../services/useServices.ts'
import loadingStore from '../../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { Error404Page } from '../../Error404Page.tsx'
import { Layout } from '../../Layout.tsx'

export function ArmyUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const name = searchParameters.get('name')
  if (name === null) {
    return <Error404Page />
  }

  // Fetch data
  const [army, setArmy] = useState<Army | null | undefined>()
  const [loading, setLoading] = useState(false)
  const { armyService } = useServices()

  const fetchArmy = useCallback(async () => {
    const armyData = await armyService.getArmy({ name })
    setArmy(armyData)
  }, [name])
  useEffect(() => {
    setLoading(true)
    fetchArmy().finally(() => setLoading(false))
  }, [fetchArmy])

  // Render
  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  if (army === null || army === undefined) {
    return <Error404Page />
  }

  const armyFormStore = new ArmyFormStore(army ?? undefined)
  return (
    <Layout>
      <ArmyForm army={army ?? undefined} armyFormStore={armyFormStore} edit loadingStore={loadingStore} />
    </Layout>
  )
}
