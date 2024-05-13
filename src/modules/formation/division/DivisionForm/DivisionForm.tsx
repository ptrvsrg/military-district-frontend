import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { Division } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { addAlert } from '../../../../utils/alert.tsx'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { DivisionFormStore } from './DivisionForm.store.ts'
import { FormationsForm } from './FormationsForm.tsx'

type DivisionFormProps = {
  division?: Division
  divisionFormStore: DivisionFormStore
  edit?: boolean
  loadingStore: LoadingStore
}

export const DivisionForm = observer((props: DivisionFormProps) => {
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
  const { divisionService } = useServices()
  const saveDivision = async () => {
    const divisionInput = props.divisionFormStore.getDivisionInput()
    if (!divisionInput) return

    let save: () => Promise<Division | null | undefined>
    if (props.edit) {
      save = async () =>
        divisionService.updateDivision({
          input: divisionInput,
          name: props.division?.name || '',
        })
    } else {
      save = async () => divisionService.createDivision({ input: divisionInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then(() => {
        navigate(`/formations/divisions/update?name=${divisionInput.name}`)
        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deleteDivision = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await divisionService.deleteDivision({ name: props.division?.name || '' })
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
      <BasicInfoForm divisionFormStore={props.divisionFormStore} militaries={militaries} />
      <FormationsForm armies={armies} divisionFormStore={props.divisionFormStore} units={units} />
      <InlineWrapper>
        <Button onClick={saveDivision} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deleteDivision} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
