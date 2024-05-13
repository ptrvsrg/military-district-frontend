import { useEffect, useState } from 'react'
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
  const { armyService } = useServices()

  useEffect(() => {
    const fetchData = async () => {
      loadingStore.setLoading(true)
      const armyData = await armyService.getArmy({ name })
      setArmy(armyData)
      loadingStore.setLoading(false)
    }

    fetchData()
  }, [])

  if (!loadingStore.getLoading() && (army === null || army === undefined)) {
    return <Error404Page />
  }

  if (loadingStore.getLoading()) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  const armyFormStore = new ArmyFormStore(army ?? undefined)
  return (
    <Layout>
      <ArmyForm army={army ?? undefined} armyFormStore={armyFormStore} edit loadingStore={loadingStore} />
    </Layout>
  )
}
