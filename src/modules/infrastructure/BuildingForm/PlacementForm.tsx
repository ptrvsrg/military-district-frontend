import { TextField, Typography } from '@mui/material'
import { LatLng } from 'leaflet'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { ColumnWrapper, RowWrapper } from '../../../styles/ts/containers.ts'
import { Map, Marker } from '../../map/Map.tsx'
import { BuildingFormStore } from './BuildingForm.store.ts'

const MapWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

type PlacementFormProps = { buildingFormStore: BuildingFormStore }

export const PlacementForm = observer((props: PlacementFormProps) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [markers, setMarkers] = useState<Marker[]>([])

  // Handlers
  const updateHeight = () => {
    if (ref.current) setHeight(ref.current.clientHeight)
  }
  const handleCoordinateChange = (event: ChangeEvent<HTMLInputElement>) => props.buildingFormStore.setCoordinateFromString(event.target.value)
  const handleMapClick = (point: LatLng) => props.buildingFormStore.setCoordinate(point)
  const handlePostCodeChange = (event: ChangeEvent<HTMLInputElement>) => props.buildingFormStore.setPostCode(Number.parseInt(event.target.value, 10))
  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => props.buildingFormStore.setCountry(event.target.value)
  const handleStateChange = (event: ChangeEvent<HTMLInputElement>) => props.buildingFormStore.setState(event.target.value)
  const handleLocalityChange = (event: ChangeEvent<HTMLInputElement>) => props.buildingFormStore.setLocality(event.target.value)
  const handleStreetChange = (event: ChangeEvent<HTMLInputElement>) => props.buildingFormStore.setStreet(event.target.value)
  const handleHouseNumberChange = (event: ChangeEvent<HTMLInputElement>) => props.buildingFormStore.setHouseNumber(event.target.value)

  useEffect(() => {
    updateHeight()
  }, [ref])

  useEffect(() => {
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  useEffect(() => {
    const coordinate = props.buildingFormStore.getCoordinate()
    const label = props.buildingFormStore.getStringCoordinate()
    if (coordinate)
      setMarkers([
        {
          coordinate: new LatLng(coordinate.lat, coordinate.lng),
          label,
        },
      ])
  }, [props.buildingFormStore.getCoordinate()])

  return (
    <>
      <Typography align={'center'} color={'white'} sx={{ textDecoration: 'underline' }} variant={'h5'}>
        {t('placement')}
      </Typography>
      <RowWrapper>
        <ColumnWrapper style={{ height }}>
          <TextField
            label={t('coordinate')}
            onChange={handleCoordinateChange}
            sx={{ width: '100%' }}
            value={props.buildingFormStore.getStringCoordinate()}
            variant={'outlined'}
          />
          <MapWrapper>
            <Map markers={markers} onClick={handleMapClick} />
          </MapWrapper>
        </ColumnWrapper>
        <ColumnWrapper ref={ref}>
          <TextField
            label={t('postCode')}
            onChange={handlePostCodeChange}
            sx={{ width: '100%' }}
            value={props.buildingFormStore.getPostCode()}
            variant={'outlined'}
          />
          <TextField
            label={t('country')}
            onChange={handleCountryChange}
            sx={{ width: '100%' }}
            value={props.buildingFormStore.getCountry()}
            variant={'outlined'}
          />
          <TextField
            label={t('state')}
            onChange={handleStateChange}
            sx={{ width: '100%' }}
            value={props.buildingFormStore.getState()}
            variant={'outlined'}
          />
          <TextField
            label={t('locality')}
            onChange={handleLocalityChange}
            sx={{ width: '100%' }}
            value={props.buildingFormStore.getLocality()}
            variant={'outlined'}
          />
          <TextField
            label={t('street')}
            onChange={handleStreetChange}
            sx={{ width: '100%' }}
            value={props.buildingFormStore.getStreet()}
            variant={'outlined'}
          />
          <TextField
            label={t('houseNumber')}
            onChange={handleHouseNumberChange}
            sx={{ width: '100%' }}
            value={props.buildingFormStore.getHouseNumber()}
            variant={'outlined'}
          />
        </ColumnWrapper>
      </RowWrapper>
    </>
  )
})
