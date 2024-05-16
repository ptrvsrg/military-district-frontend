import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { Platoon } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { addAlert } from '../../../../utils/alert.tsx'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { PlatoonFormStore } from './PlatoonForm.store.ts'

type PlatoonFormProps = {
  edit?: boolean
  loadingStore: LoadingStore
  platoon?: Platoon
  platoonFormStore: PlatoonFormStore
}

export const PlatoonForm = observer((props: PlatoonFormProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [militaries, setMilitaries] = useState<MilitaryBrief[]>([])
  const [companies, setCompanies] = useState<string[]>([])

  // Fetch data
  const { companyService, militaryService } = useServices()
  useEffect(() => {
    const fetchData = async () => {
      const militariesData = await militaryService.getMilitaryBriefs()
      setMilitaries(militariesData)
      const companiesData = await companyService.getCompanyNames()
      setCompanies(companiesData)
    }

    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [])

  // Handlers
  const { platoonService } = useServices()
  const savePlatoon = async () => {
    const platoonInput = props.platoonFormStore.getPlatoonInput()
    if (!platoonInput) return

    let save: () => Promise<Platoon | null | undefined>
    if (props.edit) {
      save = async () =>
        platoonService.updatePlatoon({
          input: platoonInput,
          name: props.platoon?.name || '',
        })
    } else {
      save = async () => platoonService.createPlatoon({ input: platoonInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then(() => {
        navigate(`/formations/platoons/update?name=${platoonInput.name}`)
        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deletePlatoon = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await platoonService.deletePlatoon({ name: props.platoon?.name || '' })
      navigate('/formations')
    }

    props.loadingStore.setLoading(true)
    await deleteOne()
      .then(() => addAlert(t('successDelete'), 'success'))
      .finally(() => props.loadingStore.setLoading(false))
  }

  if (props.loadingStore.getLoading()) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  return (
    <ColumnContent>
      <BasicInfoForm companies={companies} militaries={militaries} platoonFormStore={props.platoonFormStore} />
      <InlineWrapper>
        <Button onClick={savePlatoon} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deletePlatoon} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
