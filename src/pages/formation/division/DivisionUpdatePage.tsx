import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Division } from '../../../models/graphql/schema.ts'
import { DivisionFormStore } from '../../../modules/formation/division/DivisionForm/DivisionForm.store.ts'
import { DivisionForm } from '../../../modules/formation/division/DivisionForm/DivisionForm.tsx'
import { useServices } from '../../../services/useServices.ts'
import loadingStore from '../../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { Error404Page } from '../../Error404Page.tsx'
import { Layout } from '../../Layout.tsx'

export function DivisionUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const name = searchParameters.get('name')
  if (name === null) {
    return <Error404Page />
  }

  // Fetch data
  const [division, setDivision] = useState<Division | null | undefined>()
  const [loading, setLoading] = useState(false)
  const { divisionService } = useServices()

  const fetchDivision = useCallback(async () => {
    const divisionData = await divisionService.getDivision({ name })
    setDivision(divisionData)
  }, [name])
  useEffect(() => {
    setLoading(true)
    fetchDivision().finally(() => setLoading(false))
  }, [fetchDivision])

  // Render
  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  if (division === null || division === undefined) {
    return <Error404Page />
  }

  const divisionFormStore = new DivisionFormStore(division ?? undefined)
  return (
    <Layout>
      <DivisionForm division={division ?? undefined} divisionFormStore={divisionFormStore} edit loadingStore={loadingStore} />
    </Layout>
  )
}
