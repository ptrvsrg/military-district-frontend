import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Squad } from '../../../models/graphql/schema.ts'
import { SquadFormStore } from '../../../modules/formation/squad/SquadForm/SquadForm.store.ts'
import { SquadForm } from '../../../modules/formation/squad/SquadForm/SquadForm.tsx'
import { useServices } from '../../../services/useServices.ts'
import loadingStore from '../../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { Error404Page } from '../../Error404Page.tsx'
import { Layout } from '../../Layout.tsx'

export function SquadUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const name = searchParameters.get('name')
  if (name === null) {
    return <Error404Page />
  }

  // Fetch data
  const [squad, setSquad] = useState<Squad | null | undefined>()
  const [loading, setLoading] = useState(false)
  const { squadService } = useServices()

  const fetchSquad = useCallback(async () => {
    const squadData = await squadService.getSquad({ name })
    setSquad(squadData)
  }, [name])
  useEffect(() => {
    setLoading(true)
    fetchSquad().finally(() => setLoading(false))
  }, [fetchSquad])

  // Render
  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  if (squad === null || squad === undefined) {
    return <Error404Page />
  }

  const squadFormStore = new SquadFormStore(squad ?? undefined)
  return (
    <Layout>
      <SquadForm edit loadingStore={loadingStore} squad={squad ?? undefined} squadFormStore={squadFormStore} />
    </Layout>
  )
}
