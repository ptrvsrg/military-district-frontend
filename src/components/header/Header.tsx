import logo from '../../assets/logo.svg'
import user from '../../assets/user.svg'
import { PlainText } from '../text/Text.tsx'
import { Img, ItemContainer, Row } from './Header.styled.ts'
import { HeaderProps } from './Header.types.ts'

export function Header(props: HeaderProps) {
  return (
    <>
      <Row>
        <a href={props.homeUrl || '#'}>
          <Img src={logo} />
        </a>
        <ItemContainer>
          {props.tabs.map((tab) => {
            return (
              <a href={tab.url || '#'}>
                <PlainText size={18} text={tab.name} underlined={tab.name === props.selectedTab} />
              </a>
            )
          })}
        </ItemContainer>
        <a href={props.accountUrl || '#'}>
          <Img src={user} />
        </a>
      </Row>
    </>
  )
}
