import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { Layout } from '../Layout.tsx'
import { ArmyListPage } from './army/ArmyListPage.tsx'
import { BrigadeListPage } from './brigade/BrigadeListPage.tsx'
import { CompanyListPage } from './company/CompanyListPage.tsx'
import { CorpsListPage } from './corps/CorpsListPage.tsx'
import { DivisionListPage } from './division/DivisionListPage.tsx'
import { PlatoonListPage } from './platoon/PlatoonListPage.tsx'
import { SquadListPage } from './squad/SquadListPage.tsx'
import { UnitListPage } from './unit/UnitListPage.tsx'

export function FormationListPage() {
  const { t } = useTranslation()

  const tabs = [
    {
      label: t('units'),
      page: <UnitListPage />,
      value: 'units',
    },
    {
      label: t('squads'),
      page: <SquadListPage />,
      value: 'squads',
    },
    {
      label: t('platoons'),
      page: <PlatoonListPage />,
      value: 'platoons',
    },
    {
      label: t('companies'),
      page: <CompanyListPage />,
      value: 'companies',
    },
    {
      label: t('brigades'),
      page: <BrigadeListPage />,
      value: 'brigades',
    },
    {
      label: t('corps'),
      page: <CorpsListPage />,
      value: 'corps',
    },
    {
      label: t('divisions'),
      page: <DivisionListPage />,
      value: 'divisions',
    },
    {
      label: t('armies'),
      page: <ArmyListPage />,
      value: 'armies',
    },
  ]

  const [searchParameters, setSearchParameters] = useSearchParams()
  const tab = searchParameters.get('tab')
  const defaultTabValue = tab ?? 'units'
  const [tabValue, setTabValue] = useState(defaultTabValue)

  const handleChange = (_event: SyntheticEvent, value: any) => {
    setTabValue(value)
    setSearchParameters({ tab: value })
  }

  return (
    <Layout>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <TabList aria-label={'formation tabs'} onChange={handleChange} sx={{ color: 'white' }} variant={'scrollable'}>
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
