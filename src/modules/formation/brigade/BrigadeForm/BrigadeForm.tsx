import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { Brigade } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { addAlert } from '../../../../utils/alert.tsx'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { BrigadeFormStore } from './BrigadeForm.store.ts'
import { FormationsForm } from './FormationsForm.tsx'

type BrigadeFormProps = {
  brigade?: Brigade
  brigadeFormStore: BrigadeFormStore
  edit?: boolean
  loadingStore: LoadingStore
}

export const BrigadeForm = observer((props: BrigadeFormProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [militaries, setMilitaries] = useState<MilitaryBrief[]>([])
  const [units, setUnits] = useState<string[]>([])
  const [armies, setArmies] = useState<string[]>([])

  // Fetch data
  const { armyService, militaryService, unitService } = useServices()
  useEffect(() => {
    const fetchData = async () => {
      const militariesData = await militaryService.getMilitaryBriefs()
      setMilitaries(militariesData)
      const unitsData = await unitService.getUnitNames()
      setUnits(unitsData)
      const armiesData = await armyService.getArmyNames()
      setArmies(armiesData)
    }

    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [])

  // Handlers
  const { brigadeService } = useServices()
  const saveBrigade = async () => {
    const brigadeInput = props.brigadeFormStore.getBrigadeInput()
    if (!brigadeInput) return

    let save: () => Promise<Brigade | null | undefined>
    if (props.edit) {
      save = async () =>
        brigadeService.updateBrigade({
          input: brigadeInput,
          name: props.brigade?.name || '',
        })
    } else {
      save = async () => brigadeService.createBrigade({ input: brigadeInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then(() => {
        navigate(`/formations/brigades/update?name=${brigadeInput.name}`)
        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deleteBrigade = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await brigadeService.deleteBrigade({ name: props.brigade?.name || '' })
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
      <BasicInfoForm brigadeFormStore={props.brigadeFormStore} militaries={militaries} />
      <FormationsForm armies={armies} brigadeFormStore={props.brigadeFormStore} units={units} />
      <InlineWrapper>
        <Button onClick={saveBrigade} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deleteBrigade} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
