import { Link, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { LatLng } from 'leaflet'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Spinner } from '../components/spinner/Spinner.tsx'
import { UnitPlacement } from '../models/graphql/fragments.ts'
import { Map, Marker } from '../modules/map/Map.tsx'
import { useServices } from '../services/useServices.ts'
import { projectConfig } from '../stores/ProjectStore.ts'
import { SpinnerWrapper } from '../styles/ts/containers.ts'
import { Layout } from './Layout.tsx'

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 110px);
  box-sizing: border-box;
  gap: 30px;

  @media (max-width: 1200px) {
    flex-direction: column;
    height: max-content;
    gap: 0;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 35%;
  height: 100%;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    width: 100%;
    padding: 20px;
  }
`

const MapWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 65%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    height: 400px;
    width: 100%;
  }
`

export function MainPage() {
  // Fetch data
  const [unitPlacements, setUnitPlacements] = useState<UnitPlacement[]>([])
  const [loading, setLoading] = useState(false)
  const { unitService } = useServices()

  const fetchUnitPlacements = useCallback(async () => {
    const unitPlacementsData = await unitService.getUnitPlacements()
    setUnitPlacements(unitPlacementsData)
  }, [])
  useEffect(() => {
    setLoading(true)
    fetchUnitPlacements().finally(() => setLoading(false))
  }, [fetchUnitPlacements])

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const mapUnitPlacementsToMarkers = (unitPlacements1: UnitPlacement[]) => {
    return unitPlacements1.map((unitPlacement) => {
      return {
        coordinate: new LatLng(unitPlacement?.coordinate?.lat || 0, unitPlacement?.coordinate?.lng || 0),
        label: unitPlacement?.name || '',
      } as Marker
    })
  }

  const { t } = useTranslation()

  return (
    <>
      <Layout>
        <Content>
          <InfoWrapper>
            <Typography align={'center'} color={'white'} variant={'h4'}>
              {t('appTitle')}
            </Typography>
            <Typography align={'center'} color={'white'} variant={'body1'}>
              {t('appInfo1')}
            </Typography>
            <Typography align={'center'} color={'white'} variant={'body1'}>
              {t('appInfo2')}
            </Typography>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                gap: '10px',
                height: 'fit-content',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Typography align={'center'} color={'white'} variant={'body1'}>
                {t('appInfo3')}
              </Typography>
              <Link href={projectConfig.microserviceConfig.msRouterUrl} target={'_blank'}>
                Apollo Sandbox
              </Link>
            </Box>
          </InfoWrapper>
          <MapWrapper>
            {loading ? (
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            ) : (
              <Map markers={mapUnitPlacementsToMarkers(unitPlacements)} />
            )}
          </MapWrapper>
        </Content>
      </Layout>
    </>
  )
}
