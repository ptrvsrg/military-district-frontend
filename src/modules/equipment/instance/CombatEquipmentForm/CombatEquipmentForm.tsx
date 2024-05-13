import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { CombatEquipment, CombatEquipmentType } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { addAlert } from '../../../../utils/alert.tsx'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { CombatEquipmentFormStore } from './CombatEquipmentForm.store.ts'

type CombatEquipmentFormProps = {
  combatEquipment?: CombatEquipment
  combatEquipmentFormStore: CombatEquipmentFormStore
  edit?: boolean
  loadingStore: LoadingStore
}

export const CombatEquipmentForm = observer((props: CombatEquipmentFormProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [combatEquipment, setCombatEquipment] = useState<CombatEquipment | undefined>(props.combatEquipment)
  const [units, setUnits] = useState<string[]>([])
  const [types, setTypes] = useState<CombatEquipmentType[]>([])

  // Fetch data
  const { combatEquipmentTypeService, unitService } = useServices()
  useEffect(() => {
    const fetchData = async () => {
      const unitsData = await unitService.getUnitNames()
      setUnits(unitsData)
      const typesData = await combatEquipmentTypeService.getCombatEquipmentTypes({})
      setTypes(typesData)
    }

    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [])

  // Handlers
  const { combatEquipmentService } = useServices()
  const saveCombatEquipment = async () => {
    const combatEquipmentInput = props.combatEquipmentFormStore.getCombatEquipmentInput()
    if (!combatEquipmentInput) return

    let save: () => Promise<CombatEquipment | null | undefined>
    if (props.edit) {
      save = async () =>
        combatEquipmentService.updateCombatEquipment({
          input: combatEquipmentInput,
          serialNumber: combatEquipment?.serialNumber || '',
        })
    } else {
      save = async () => combatEquipmentService.createCombatEquipment({ input: combatEquipmentInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then((value) => {
        setCombatEquipment(value ?? undefined)

        const url = new URL(window.location.href)
        url.searchParams.set('serialNumber', value?.serialNumber ?? '')
        window.history.pushState(null, '', url.toString())

        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deleteCombatEquipment = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await combatEquipmentService.deleteCombatEquipment({
        serialNumber: combatEquipment?.serialNumber ?? '',
      })
      navigate('/equipments?tab=instances')
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
      <BasicInfoForm combatEquipmentFormStore={props.combatEquipmentFormStore} types={types} units={units} />
      <InlineWrapper>
        <Button onClick={saveCombatEquipment} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deleteCombatEquipment} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
