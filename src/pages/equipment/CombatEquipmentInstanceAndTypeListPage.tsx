import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { Layout } from '../Layout.tsx'
import { CombatEquipmentPage } from './instance/CombatEquipmentListPage.tsx'
import { CombatEquipmentTypePage } from './type/CombatEquipmentTypeListPage.tsx'

export function CombatEquipmentInstanceAndTypeListPage() {
  const { t } = useTranslation()

  const tabs = [
    {
      label: t('types'),
      page: <CombatEquipmentTypePage />,
      value: 'types',
    },
    {
      label: t('instances'),
      page: <CombatEquipmentPage />,
      value: 'instances',
    },
  ]

  const [searchParameters, setSearchParameters] = useSearchParams()
  const tab = searchParameters.get('tab')
  const defaultTabValue = tab ?? 'types'
  const [tabValue, setTabValue] = useState(defaultTabValue)

  const handleChange = (_event: SyntheticEvent, value: any) => {
    setTabValue(value)
    setSearchParameters({ tab: value })
  }

  return (
    <Layout>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <TabList aria-label={'equipment tabs'} onChange={handleChange} sx={{ color: 'white' }} variant={'scrollable'}>
            {tabs.map((tab1) => (
              <Tab label={tab1.label} value={tab1.value} />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab1) => (
          <TabPanel sx={{ padding: '30px 0 0 0', width: '100%' }} value={tab1.value}>
            {tab1.page}
          </TabPanel>
        ))}
      </TabContext>
    </Layout>
  )
}
