import logo from '../../assets/logo.svg'
import user from '../../assets/user.svg'
import { PlainText } from '../text/Text.tsx'
import { Img, ItemContainer, Row } from './Header.styled.ts'
import { HeaderProps } from './Header.types.ts'

export function Header(props: HeaderProps) {
  const { accountUrl, homeUrl, selectedTab, tabs } = props

  return (
    <>
      <Row>
        <a href={homeUrl || '#'}>
          <Img src={logo} />
        </a>
        <ItemContainer>
          {tabs.map((tab) => {
            return (
              <a href={tab.url || '#'}>
                <PlainText
                  config={{
                    size: 18,
                    text: tab.name,
                    underlined: tab.name === selectedTab,
                  }}
                />
              </a>
            )
          })}
        </ItemContainer>
        <a href={accountUrl || '#'}>
          <Img src={user} />
        </a>
      </Row>
    </>
  )
}
