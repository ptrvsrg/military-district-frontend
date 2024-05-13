import { TextField, Typography } from '@mui/material'
import { LatLng } from 'leaflet'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { ColumnWrapper, RowWrapper } from '../../../../styles/ts/containers.ts'
import { Map, Marker } from '../../../map/Map.tsx'
import { UnitFormStore } from './UnitForm.store.ts'

const MapWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

type PlacementFormProps = { unitFormStore: UnitFormStore }

export const PlacementForm = observer((props: PlacementFormProps) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [markers, setMarkers] = useState<Marker[]>([])

  // Handlers
  const updateHeight = () => {
    if (ref.current) setHeight(ref.current.clientHeight)
  }
  const handleCoordinateChange = (event: ChangeEvent<HTMLInputElement>) => props.unitFormStore.setCoordinateFromString(event.target.value)
  const handleMapClick = (point: LatLng) => props.unitFormStore.setCoordinate(point)
  const handlePostCodeChange = (event: ChangeEvent<HTMLInputElement>) => props.unitFormStore.setPostCode(Number.parseInt(event.target.value, 10))
  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => props.unitFormStore.setCountry(event.target.value)
  const handleStateChange = (event: ChangeEvent<HTMLInputElement>) => props.unitFormStore.setState(event.target.value)
  const handleLocalityChange = (event: ChangeEvent<HTMLInputElement>) => props.unitFormStore.setLocality(event.target.value)
  const handleStreetChange = (event: ChangeEvent<HTMLInputElement>) => props.unitFormStore.setStreet(event.target.value)
  const handleHouseNumberChange = (event: ChangeEvent<HTMLInputElement>) => props.unitFormStore.setHouseNumber(event.target.value)

  useEffect(() => {
    updateHeight()
  }, [ref])

  useEffect(() => {
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  useEffect(() => {
    const coordinate = props.unitFormStore.getCoordinate()
    const label = props.unitFormStore.getStringCoordinate()
    if (coordinate)
      setMarkers([
        {
          coordinate: new LatLng(coordinate.lat, coordinate.lng),
          label,
        },
      ])
  }, [props.unitFormStore.getCoordinate()])

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
            value={props.unitFormStore.getStringCoordinate()}
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
            value={props.unitFormStore.getPostCode()}
            variant={'outlined'}
          />
          <TextField
            label={t('country')}
            onChange={handleCountryChange}
            sx={{ width: '100%' }}
            value={props.unitFormStore.getCountry()}
            variant={'outlined'}
          />
          <TextField
            label={t('state')}
            onChange={handleStateChange}
            sx={{ width: '100%' }}
            value={props.unitFormStore.getState()}
            variant={'outlined'}
          />
          <TextField
            label={t('locality')}
            onChange={handleLocalityChange}
            sx={{ width: '100%' }}
            value={props.unitFormStore.getLocality()}
            variant={'outlined'}
          />
          <TextField
            label={t('street')}
            onChange={handleStreetChange}
            sx={{ width: '100%' }}
            value={props.unitFormStore.getStreet()}
            variant={'outlined'}
          />
          <TextField
            label={t('houseNumber')}
            onChange={handleHouseNumberChange}
            sx={{ width: '100%' }}
            value={props.unitFormStore.getHouseNumber()}
            variant={'outlined'}
          />
        </ColumnWrapper>
      </RowWrapper>
    </>
  )
})
