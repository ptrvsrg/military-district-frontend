import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { BeatLoader } from 'react-spinners'
import styled from 'styled-components'

import { Header } from '../components/header/Header.tsx'
import { HeaderText, PlainText } from '../components/text/Text.tsx'
import { TextAlign } from '../components/text/Text.types.ts'
import { Map } from '../modules/map/Map.tsx'
import { Color } from '../styles/ts/colors.ts'

const Container = styled.div`
  display: block;
  width: 100%;
  height: calc(100vh - 40px);
  padding: 20px;
  box-sizing: border-box;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding-top: 20px;
  box-sizing: border-box;
`

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 25%;
  height: 100%;
  gap: 20px;
  padding-left: 20px;
`

const MapWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 75%;
  height: 100%;
`

export default function MainPage() {
  const { t } = useTranslation()

  return (
    <>
      <Container>
        <Header />
        <Content>
          <InfoWrapper>
            <HeaderText align={TextAlign.CENTER} size={30} text={t('appTitle')} />
            <PlainText align={TextAlign.CENTER} size={18} text={t('appInfo1')} />
            <PlainText align={TextAlign.CENTER} size={18} text={t('appInfo2')} />
          </InfoWrapper>
          <MapWrapper>
            <Suspense
              fallback={
                <div>
                  <BeatLoader color={Color.WHITE} size={10} />
                </div>
              }
            >
              <Map height={550} width={800} />
            </Suspense>
          </MapWrapper>
        </Content>
      </Container>
    </>
  )
}
