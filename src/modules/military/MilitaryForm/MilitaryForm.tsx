import { Avatar, Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import avatar from '../../../assets/icons/avatar.png'
import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Military, Rank, Specialty } from '../../../models/graphql/schema.ts'
import { useServices } from '../../../services/useServices.ts'
import { LoadingStore } from '../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { addAlert } from '../../../utils/alert.tsx'
import { AttributesForm } from './AttributesForm.tsx'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { MilitaryFormStore } from './MilitaryForm.store.ts'
import { SpecialtiesForm } from './SpecialtiesForm.tsx'

type MilitaryFormProps = {
  edit?: boolean
  loadingStore: LoadingStore
  military?: Military
  militaryFormStore: MilitaryFormStore
}

export const MilitaryForm = observer((props: MilitaryFormProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [ranks, setRanks] = useState<Rank[]>([])
  const [units, setUnits] = useState<string[]>([])
  const [specialties, setSpecialties] = useState<Specialty[]>([])

  // Fetch data
  const { rankService, specialtyService, unitService } = useServices()
  useEffect(() => {
    const fetchData = async () => {
      const ranksData = await rankService.getRanks()
      setRanks(ranksData)
      const unitsData = await unitService.getUnitNames()
      setUnits(unitsData)
      const specialtiesData = await specialtyService.getSpecialties()
      setSpecialties(specialtiesData)
    }

    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [])

  // Handlers
  const { militaryService } = useServices()
  const saveMilitary = async () => {
    const militaryInput = props.militaryFormStore.getMilitaryInput()
    if (!militaryInput) return

    let save: () => Promise<Military | null | undefined>
    if (props.edit) {
      save = async () =>
        militaryService.updateMilitary({
          input: militaryInput,
          mbn: props.military?.mbn || '',
        })
    } else {
      save = async () => militaryService.createMilitary({ input: militaryInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then(() => {
        navigate(`/militaries/update?mbn=${militaryInput.mbn}`)
        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deleteMilitary = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await militaryService.deleteMilitary({ mbn: props.military?.mbn || '' })
      navigate('/militaries')
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
      <Avatar src={avatar} sx={{ height: 150, width: 150 }} />
      <BasicInfoForm militaryFormStore={props.militaryFormStore} ranks={ranks} units={units} />
      <SpecialtiesForm militaryFormStore={props.militaryFormStore} specialties={specialties} />
      <AttributesForm militaryFormStore={props.militaryFormStore} ranks={ranks} />
      <InlineWrapper>
        <Button onClick={saveMilitary} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deleteMilitary} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
