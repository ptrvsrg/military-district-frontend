import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { Weapon, WeaponType } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { addAlert } from '../../../../utils/alert.tsx'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { WeaponFormStore } from './WeaponForm.store.ts'

type WeaponFormProps = {
  edit?: boolean
  loadingStore: LoadingStore
  weapon?: Weapon
  weaponFormStore: WeaponFormStore
}

export const WeaponForm = observer((props: WeaponFormProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [weapon, setWeapon] = useState<Weapon | undefined>(props.weapon)
  const [units, setUnits] = useState<string[]>([])
  const [types, setTypes] = useState<WeaponType[]>([])

  // Fetch data
  const { unitService, weaponTypeService } = useServices()
  useEffect(() => {
    const fetchData = async () => {
      const unitsData = await unitService.getUnitNames()
      setUnits(unitsData)
      const typesData = await weaponTypeService.getWeaponTypes({})
      setTypes(typesData)
    }

    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [])

  // Handlers
  const { weaponService } = useServices()
  const saveWeapon = async () => {
    const weaponInput = props.weaponFormStore.getWeaponInput()
    if (!weaponInput) return

    let save: () => Promise<Weapon | null | undefined>
    if (props.edit) {
      save = async () =>
        weaponService.updateWeapon({
          input: weaponInput,
          serialNumber: weapon?.serialNumber || '',
        })
    } else {
      save = async () => weaponService.createWeapon({ input: weaponInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then((value) => {
        setWeapon(value ?? undefined)

        const url = new URL(window.location.href)
        url.searchParams.set('serialNumber', value?.serialNumber ?? '')
        window.history.pushState(null, '', url.toString())

        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deleteWeapon = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await weaponService.deleteWeapon({
        serialNumber: weapon?.serialNumber ?? '',
      })
      navigate('/weapons?tab=instances')
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
      <BasicInfoForm types={types} units={units} weaponFormStore={props.weaponFormStore} />
      <InlineWrapper>
        <Button onClick={saveWeapon} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deleteWeapon} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
