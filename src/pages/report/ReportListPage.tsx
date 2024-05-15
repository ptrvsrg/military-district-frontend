import { ArticleOutlined } from '@mui/icons-material'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Spinner } from '../../components/spinner/Spinner.tsx'
import { ReportInfoOutput } from '../../models/report/report.types.ts'
import { useServices } from '../../services/useServices.ts'
import loadingStore from '../../stores/LoadingStore.ts'
import { ColumnContent, SpinnerWrapper } from '../../styles/ts/containers.ts'
import { Layout } from '../Layout.tsx'

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
`

export function ReportListPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // State
  const [reports, setReports] = useState<ReportInfoOutput[]>([])

  // Fetch data
  const { reportService } = useServices()
  useEffect(() => {
    const fetchData = async () => {
      const reportsData = await reportService.getAll({})
      setReports(reportsData)
    }

    loadingStore.setLoading(true)
    fetchData().finally(() => loadingStore.setLoading(false))
  }, [])

  if (loadingStore.getLoading()) {
    return (
      <Layout>
        <SpinnerWrapper style={{ height: 'calc(100vh - 110px)' }}>
          <Spinner />
        </SpinnerWrapper>
      </Layout>
    )
  }

  return (
    <Layout>
      <ColumnContent>
        <Typography align={'center'} color={'white'} variant={'h5'}>
          {t('availableReport')}
        </Typography>
        <ListWrapper>
          <List sx={{ width: '100%' }}>
            {reports.map((report) => (
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate(`/reports/build?name=${report.name}`)}>
                  <ListItemIcon>
                    <ArticleOutlined />
                  </ListItemIcon>{' '}
                  <ListItemText primary={report.name.toUpperCase().replaceAll('_', ' ')} sx={{ color: 'white' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </ListWrapper>
      </ColumnContent>
    </Layout>
  )
}
