import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { WeaponCategory, WeaponType } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { addAlert } from '../../../../utils/alert.tsx'
import { AttributesForm } from './AttributesForm.tsx'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { WeaponTypeFormStore } from './WeaponTypeForm.store.ts'

type WeaponTypeFormProps = {
  edit?: boolean
  loadingStore: LoadingStore
  weaponType?: WeaponType
  weaponTypeFormStore: WeaponTypeFormStore
}

export const WeaponTypeForm = observer((props: WeaponTypeFormProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [weaponType, setWeaponType] = useState<WeaponType | undefined>(props.weaponType)
  const [units, setUnits] = useState<string[]>([])
  const [types, setTypes] = useState<WeaponCategory[]>([])

  // Fetch data
  const { unitService, weaponCategoryService } = useServices()
  useEffect(() => {
    const fetchData = async () => {
      const unitsData = await unitService.getUnitNames()
      setUnits(unitsData)
      const categoriesData = await weaponCategoryService.getWeaponCategories({
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
  const { weaponTypeService } = useServices()
  const saveWeaponType = async () => {
    const weaponTypeInput = props.weaponTypeFormStore.getWeaponTypeInput()
    if (!weaponTypeInput) return

    let save: () => Promise<WeaponType | null | undefined>
    if (props.edit) {
      save = async () =>
        weaponTypeService.updateWeaponType({
          category: weaponType?.category.name || '',
          input: weaponTypeInput,
          name: weaponType?.name || '',
        })
    } else {
      save = async () => weaponTypeService.createWeaponType({ input: weaponTypeInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then((value) => {
        setWeaponType(value ?? undefined)

        const url = new URL(window.location.href)
        url.searchParams.set('name', value?.name ?? '')
        url.searchParams.set('category', value?.category.name ?? '')
        window.history.pushState(null, '', url.toString())

        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deleteWeaponType = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await weaponTypeService.deleteWeaponType({
        category: weaponType?.category.name ?? '',
        name: weaponType?.name ?? '',
      })
      navigate('/weapons?tab=types')
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
      <BasicInfoForm categories={types} units={units} weaponTypeFormStore={props.weaponTypeFormStore} />
      <AttributesForm weaponTypeFormStore={props.weaponTypeFormStore} />
      <InlineWrapper>
        <Button onClick={saveWeaponType} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deleteWeaponType} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
