import { Icon, LatLng, Point } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { Marker as LeafletMarker, MapContainer, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { FullscreenControl } from 'react-leaflet-fullscreen'
import 'react-leaflet-fullscreen/styles.css'

import marker from '../../assets/icons/marker.svg'

export interface Marker {
  coordinate: LatLng
  label: string
}

export interface MapProps {
  center?: LatLng
  markers?: Marker[]
  onClick?: (point: LatLng) => void
}

const ResizeMap = ({ containerRef }) => {
  const map = useMap()

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize()
      }, 100)
    }
  }, [containerRef.current.clientHeight, containerRef.current.clientWidth])

  return null
}

const FindLocation = ({ onClick }: { onClick: ((point: LatLng) => void) | undefined }) => {
  useMapEvents({
    click(event) {
      if (onClick) onClick(event.latlng)
    },
  })
  return null
}

export function Map(props: MapProps) {
  const center = props.center ?? new LatLng(54.979_778, 82.898_654)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      style={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        height: '100%',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <MapContainer
        attributionControl={false}
        center={center}
        style={{
          height: '100%',
          width: '100%',
        }}
        zoom={3}
        zoomControl={false}
      >
        <TileLayer subdomains={['mt1', 'mt2', 'mt3']} url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" />
        {props.markers &&
          props.markers.map((point) => (
            <LeafletMarker
              icon={
                new Icon({
                  iconSize: new Point(25, 25),
                  iconUrl: marker,
                })
              }
              position={point.coordinate}
            >
              <Popup>
                <p>{point.label}</p>
              </Popup>
            </LeafletMarker>
          ))}
        <ResizeMap containerRef={ref} />
        <FullscreenControl position={'bottomright'} />
        <FindLocation onClick={props.onClick} />
      </MapContainer>
    </div>
  )
}
