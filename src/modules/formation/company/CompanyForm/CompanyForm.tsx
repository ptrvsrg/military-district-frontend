import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { Company } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { ColumnContent, InlineWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { addAlert } from '../../../../utils/alert.tsx'
import { BasicInfoForm } from './BasicInfoForm.tsx'
import { CompanyFormStore } from './CompanyForm.store.ts'

type CompanyFormProps = {
  company?: Company
  companyFormStore: CompanyFormStore
  edit?: boolean
  loadingStore: LoadingStore
}

export const CompanyForm = observer((props: CompanyFormProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [militaries, setMilitaries] = useState<MilitaryBrief[]>([])
  const [units, setUnits] = useState<string[]>([])

  // Fetch data
  const { militaryService, unitService } = useServices()
  useEffect(() => {
    const fetchData = async () => {
      const militariesData = await militaryService.getMilitaryBriefs()
      setMilitaries(militariesData)
      const unitsData = await unitService.getUnitNames()
      setUnits(unitsData)
    }

    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [])

  // Handlers
  const { companyService } = useServices()
  const saveCompany = async () => {
    const companyInput = props.companyFormStore.getCompanyInput()
    if (!companyInput) return

    let save: () => Promise<Company | null | undefined>
    if (props.edit) {
      save = async () =>
        companyService.updateCompany({
          input: companyInput,
          name: props.company?.name || '',
        })
    } else {
      save = async () => companyService.createCompany({ input: companyInput })
    }

    props.loadingStore.setLoading(true)
    await save()
      .then(() => {
        navigate(`/formations/companies/update?name=${companyInput.name}`)
        addAlert(t('successSave'), 'success')
      })
      .finally(() => props.loadingStore.setLoading(false))
  }
  const deleteCompany = async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteOne = async () => {
      await companyService.deleteCompany({ name: props.company?.name || '' })
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
      <BasicInfoForm companyFormStore={props.companyFormStore} militaries={militaries} units={units} />
      <InlineWrapper>
        <Button onClick={saveCompany} style={{ height: 56 }} variant="contained">
          {t('save')}
        </Button>
        {props.edit && (
          <Button onClick={deleteCompany} style={{ height: 56 }} variant="contained">
            {t('delete')}
          </Button>
        )}
      </InlineWrapper>
    </ColumnContent>
  )
})
