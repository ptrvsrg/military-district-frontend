import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { CombatEquipmentCategory, CombatEquipmentType } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { addAlert } from '../../../../utils/alert.tsx'
import { AttributesForm } from './AttributesForm.tsx'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { CombatEquipmentTypeFormStore } from './CombatEquipmentTypeForm.store.ts'

type CombatEquipmentTypeFormProps = {
  combatEquipmentType?: CombatEquipmentType
  combatEquipmentTypeFormStore: CombatEquipmentTypeFormStore
  edit?: boolean
  loadingStore: LoadingStore
}

export const CombatEquipmentTypeForm = observer((props: CombatEquipmentTypeFormProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [combatEquipmentType, setCombatEquipmentType] = useState<CombatEquipmentType | undefined>(props.combatEquipmentType)
  const [units, setUnits] = useState<string[]>([])
  const [types, setTypes] = useState<CombatEquipmentCategory[]>([])

  // Fetch data
  const { combatEquipmentCategoryService, unitService } = useServices()
  useEffect(() => {
    const fetchData = async () => {
      const unitsData = await unitService.getUnitNames()
      setUnits(unitsData)
      const categoriesData = await combatEquipmentCategoryService.getCombatEquipmentCategories({
        sorts: [
          {
            field: 'name',
            sortAsc: true,
          },
        ],
      })
      setTypes(categoriesData)
    }

    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [])

  // Handlers
  const { combatEquipmentTypeService } = useServices()
  const saveCombatEquipmentType = async () => {
    const combatEquipmentTypeInput = props.combatEquipmentTypeFormStore.getCombatEquipmentTypeInput()
    if (!combatEquipmentTypeInput) return

    let save: () => Promise<CombatEquipmentType | null | undefined>
    if (props.edit) {
      save = async () =>
        combatEquipmentTypeService.updateCombatEquipmentType({
          category: combatEquipmentType?.category.name || '',
          input: combatEquipmentTypeInput,
          name: combatEquipmentType?.name || '',
        })
    } else {
      save = async () => combatEquipmentTypeService.createCombatEquipmentType({ input: combatEquipmentTypeInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then((value) => {
        setCombatEquipmentType(value ?? undefined)

        const url = new URL(window.location.href)
        url.searchParams.set('name', value?.name ?? '')
        url.searchParams.set('category', value?.category.name ?? '')
        window.history.pushState(null, '', url.toString())

        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deleteCombatEquipmentType = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await combatEquipmentTypeService.deleteCombatEquipmentType({
        category: combatEquipmentType?.category.name ?? '',
        name: combatEquipmentType?.name ?? '',
      })
      navigate('/equipments?tab=types')
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
      <BasicInfoForm categories={types} combatEquipmentTypeFormStore={props.combatEquipmentTypeFormStore} units={units} />
      <AttributesForm combatEquipmentTypeFormStore={props.combatEquipmentTypeFormStore} />
      <InlineWrapper>
        <Button onClick={saveCombatEquipmentType} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deleteCombatEquipmentType} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
