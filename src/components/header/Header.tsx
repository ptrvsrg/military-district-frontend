import { useKeycloak } from '@react-keycloak/web'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import logo from '../../assets/logo.svg'
import user from '../../assets/user.svg'
import { Dropdown, MenuItem } from '../dropdown/Dropdown.tsx'
import { MenuAlign } from '../dropdown/Dropdown.types.ts'
import { PlainText } from '../text/Text.tsx'
import { Img, ItemContainer, Row } from './Header.styled.ts'

export function Header() {
  const { keycloak } = useKeycloak()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const goToMain = () => navigate('/')
  const goToAccount = () => {
    console.log('Hellllo')
    keycloak.accountManagement()
  }
  const logout = () => keycloak.logout()

  return (
    <>
      <Row>
        <Img onClick={goToMain} src={logo} />
        <ItemContainer>
          <a href={'/militaries'}>
            <PlainText size={18} text={t('militaries')} />
          </a>
          <a href={'/formations'}>
            <PlainText size={18} text={t('formations')} />
          </a>
          <a href={'/buildings'}>
            <PlainText size={18} text={t('buildings')} />
          </a>
          <a href={'/equipments'}>
            <PlainText size={18} text={t('equipments')} />
          </a>
          <a href={'/queries'}>
            <PlainText size={18} text={t('queries')} />
          </a>
        </ItemContainer>
        <Dropdown height={22} image={user} menuAlign={MenuAlign.RIGHT}>
          <MenuItem onClick={goToAccount} size={16} text={t('account')} />
          <MenuItem onClick={logout} size={16} text={t('logout')} />
        </Dropdown>
      </Row>
    </>
  )
}
