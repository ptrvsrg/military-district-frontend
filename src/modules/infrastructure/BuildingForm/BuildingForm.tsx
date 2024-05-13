import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Building } from '../../../models/graphql/schema.ts'
import { useServices } from '../../../services/useServices.ts'
import { LoadingStore } from '../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { addAlert } from '../../../utils/alert.tsx'
import { AttributesForm } from './AttributesForm.tsx'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { BuildingFormStore } from './BuildingForm.store.ts'
import { FormationsForm } from './FormationsForm.tsx'
import { PlacementForm } from './PlacementForm.tsx'

type BuildingFormProps = {
  building?: Building
  buildingFormStore: BuildingFormStore
  edit?: boolean
  loadingStore: LoadingStore
}

export const BuildingForm = observer((props: BuildingFormProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [units, setUnits] = useState<string[]>([])
  const [companies, setCompanies] = useState<string[]>([])
  const [platoons, setPlatoons] = useState<string[]>([])
  const [squads, setSquads] = useState<string[]>([])

  // Fetch data
  const { companyService, platoonService, squadService, unitService } = useServices()
  useEffect(() => {
    const fetchData = async () => {
      const unitsData = await unitService.getUnitNames()
      setUnits(unitsData)
      const companiesData = await companyService.getCompanyNames()
      setCompanies(companiesData)
      const platoonsData = await platoonService.getPlatoonNames()
      setPlatoons(platoonsData)
      const squadsData = await squadService.getSquadNames()
      setSquads(squadsData)
    }

    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [])

  // Handlers
  const { buildingService } = useServices()
  const saveBuilding = async () => {
    const buildingInput = props.buildingFormStore.getBuildingInput()
    if (!buildingInput) return

    let save: () => Promise<Building | null | undefined>
    if (props.edit) {
      save = async () =>
        buildingService.updateBuilding({
          input: buildingInput,
          name: props.building?.name || '',
          unit: props.building?.unit?.name || '',
        })
    } else {
      save = async () => buildingService.createBuilding({ input: buildingInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then(() => {
        // eslint-disable-next-line sonarjs/no-nested-template-literals
        navigate(`/buildings/update?name=${buildingInput.name}${buildingInput.unit ? `&unit=${buildingInput.unit}` : ''}`)
        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deleteBuilding = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await buildingService.deleteBuilding({ name: props.building?.name || '' })
      navigate('/infrastructure')
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
      <BasicInfoForm buildingFormStore={props.buildingFormStore} units={units} />
      <PlacementForm buildingFormStore={props.buildingFormStore} />
      <FormationsForm
        buildingFormStore={props.buildingFormStore}
        companies={companies}
        loadingStore={props.loadingStore}
        platoons={platoons}
        squads={squads}
      />
      <AttributesForm buildingFormStore={props.buildingFormStore} />
      <InlineWrapper>
        <Button onClick={saveBuilding} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deleteBuilding} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
