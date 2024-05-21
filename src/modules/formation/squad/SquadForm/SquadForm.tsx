import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { Squad } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { addAlert } from '../../../../utils/alert.tsx'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { SquadFormStore } from './SquadForm.store.ts'

type SquadFormProps = {
  edit?: boolean
  loadingStore: LoadingStore
  squad?: Squad
  squadFormStore: SquadFormStore
}

export const SquadForm = observer((props: SquadFormProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [militaries, setMilitaries] = useState<MilitaryBrief[]>([])
  const [platoons, setPlatoons] = useState<string[]>([])

  // Fetch data
  const { militaryService, platoonService } = useServices()
  useEffect(() => {
    const fetchData = async () => {
      const militariesData = await militaryService.getMilitaryBriefs()
      setMilitaries(militariesData)
      const platoonsData = await platoonService.getPlatoonNames()
      setPlatoons(platoonsData)
    }

    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [])

  // Handlers
  const { squadService } = useServices()
  const saveSquad = async () => {
    const squadInput = props.squadFormStore.getSquadInput()
    if (!squadInput) return

    let save: () => Promise<Squad | null | undefined>
    if (props.edit) {
      save = async () =>
        squadService.updateSquad({
          input: squadInput,
          name: props.squad?.name || '',
        })
    } else {
      save = async () => squadService.createSquad({ input: squadInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then(() => {
        navigate(`/formations/squads/update?name=${squadInput.name}`)
        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deleteSquad = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await squadService.deleteSquad({ name: props.squad?.name || '' })
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
      <BasicInfoForm militaries={militaries} platoons={platoons} squadFormStore={props.squadFormStore} />
      <InlineWrapper>
        <Button onClick={saveSquad} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deleteSquad} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
