import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { Unit } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { addAlert } from '../../../../utils/alert.tsx'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { FormationsForm } from './FormationsForm.tsx'
import { PlacementForm } from './PlacementForm.tsx'
import { UnitFormStore } from './UnitForm.store.ts'

type UnitFormProps = {
  edit?: boolean
  loadingStore: LoadingStore
  unit?: Unit
  unitFormStore: UnitFormStore
}

export const UnitForm = observer((props: UnitFormProps) => {
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
  const { unitService } = useServices()
  const saveUnit = async () => {
    const unitInput = props.unitFormStore.getUnitInput()
    if (!unitInput) return

    let save: () => Promise<Unit | null | undefined>
    if (props.edit) {
      save = async () =>
        unitService.updateUnit({
          input: unitInput,
          name: props.unit?.name || '',
        })
    } else {
      save = async () => unitService.createUnit({ input: unitInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then(() => {
        navigate(`/formations/units/update?name=${unitInput.name}`)
        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deleteUnit = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await unitService.deleteUnit({ name: props.unit?.name || '' })
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
      <BasicInfoForm militaries={militaries} unitFormStore={props.unitFormStore} />
      <PlacementForm unitFormStore={props.unitFormStore} />
      <FormationsForm brigades={brigades} corps={corps} divisions={divisions} loadingStore={props.loadingStore} unitFormStore={props.unitFormStore} />
      <InlineWrapper>
        <Button onClick={saveUnit} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deleteUnit} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
