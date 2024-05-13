import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { Army } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { addAlert } from '../../../../utils/alert.tsx'
import { ArmyFormStore } from './ArmyForm.store.ts'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { FormationsForm } from './FormationsForm.tsx'

type ArmyFormProps = {
  army?: Army
  armyFormStore: ArmyFormStore
  edit?: boolean
  loadingStore: LoadingStore
}

export const ArmyForm = observer((props: ArmyFormProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [militaries, setMilitaries] = useState<MilitaryBrief[]>([])
  const [brigades, setBrigades] = useState<string[]>([])
  const [corps, setCorps] = useState<string[]>([])
  const [divisions, setDivisions] = useState<string[]>([])

  // Fetch data
  const { brigadeService, corpsService, divisionService, militaryService } = useServices()
  useEffect(() => {
    const fetchData = async () => {
      const militariesData = await militaryService.getMilitaryBriefs()
      setMilitaries(militariesData)
      const brigadesData = await brigadeService.getBrigadeNames()
      setBrigades(brigadesData)
      const corpsData = await corpsService.getCorpsNames()
      setCorps(corpsData)
      const divisionsData = await divisionService.getDivisionNames()
      setDivisions(divisionsData)
    }

    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [])

  // Handlers
  const { armyService } = useServices()
  const saveArmy = async () => {
    const armyInput = props.armyFormStore.getArmyInput()
    if (!armyInput) return

    let save: () => Promise<Army | null | undefined>
    if (props.edit) {
      save = async () =>
        armyService.updateArmy({
          input: armyInput,
          name: props.army?.name || '',
        })
    } else {
      save = async () => armyService.createArmy({ input: armyInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then(() => {
        navigate(`/formations/armies/update?name=${armyInput.name}`)
        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deleteArmy = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await armyService.deleteArmy({ name: props.army?.name || '' })
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
      <BasicInfoForm armyFormStore={props.armyFormStore} militaries={militaries} />
      <FormationsForm armyFormStore={props.armyFormStore} brigades={brigades} corps={corps} divisions={divisions} loadingStore={props.loadingStore} />
      <InlineWrapper>
        <Button onClick={saveArmy} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deleteArmy} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
