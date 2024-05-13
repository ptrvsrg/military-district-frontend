import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { Corps } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { addAlert } from '../../../../utils/alert.tsx'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { CorpsFormStore } from './CorpsForm.store.ts'
import { FormationsForm } from './FormationsForm.tsx'

type CorpsFormProps = {
  corps?: Corps
  corpsFormStore: CorpsFormStore
  edit?: boolean
  loadingStore: LoadingStore
}

export const CorpsForm = observer((props: CorpsFormProps) => {
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
  const { corpsService } = useServices()
  const saveCorps = async () => {
    const corpsInput = props.corpsFormStore.getCorpsInput()
    if (!corpsInput) return

    let save: () => Promise<Corps | null | undefined>
    if (props.edit) {
      save = async () =>
        corpsService.updateCorps({
          input: corpsInput,
          name: props.corps?.name || '',
        })
    } else {
      save = async () => corpsService.createCorps({ input: corpsInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then(() => {
        navigate(`/formations/corps/update?name=${corpsInput.name}`)
        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deleteCorps = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await corpsService.deleteCorps({ name: props.corps?.name || '' })
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
      <BasicInfoForm corpsFormStore={props.corpsFormStore} militaries={militaries} />
      <FormationsForm armies={armies} corpsFormStore={props.corpsFormStore} units={units} />
      <InlineWrapper>
        <Button onClick={saveCorps} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deleteCorps} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
