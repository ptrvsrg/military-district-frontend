import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'

import mapLabel from '../../assets/map_label.svg'
import { Color } from '../../styles/ts/colors.ts'

export interface MapProps {
  height: number
  markers?: {
    coordinates: number[]
    label: string
  }[]
  width: number
}

export function Map(props: MapProps) {
  return (
    <ComposableMap height={props.height} projection="geoEqualEarth" width={props.width}>
      <ZoomableGroup center={[0, 0]} zoom={1}>
        <Geographies geography={'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                geography={geo}
                key={geo.rsmKey}
                style={{
                  default: {
                    fill: Color.WHITE,
                    outline: 'none',
                    stroke: Color.BLACK,
                    strokeWidth: 1,
                  },
                  hover: {
                    fill: Color.LIGHT_GRAY,
                    outline: 'none',
                  },
                  pressed: {
                    fill: Color.DARK_GRAY,
                    outline: 'none',
                  },
                }}
              />
            ))
          }
        </Geographies>
        {props.markers?.map((marker, index) => {
          console.log('OK')
          return (
            <Marker coordinates={marker.coordinates} key={index}>
              <image height={16} href={mapLabel} x={-8} y={-16} />
            </Marker>
          )
        })}
      </ZoomableGroup>
    </ComposableMap>
  )
}
