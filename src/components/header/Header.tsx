import {
  AccountCircleOutlined,
  ArticleOutlined,
  FlightOutlined,
  GroupsOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  MilitaryTechOutlined,
  PersonOutlined,
  ShieldOutlined,
} from '@mui/icons-material'
import { Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ToggleButton, ToggleButtonGroup } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import logo from '../../assets/icons/logo.svg'
import { getLanguage, setLanguage } from '../../stores/LocaleStore.ts'

export function Header() {
  const ref = useRef<HTMLDivElement>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [width, setWidth] = useState(1920)
  const { keycloak } = useKeycloak()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const updateWidth = () => {
    if (ref.current) setWidth(ref.current.clientWidth)
  }
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  const goToMain = () => navigate('/')
  const goToAccount = () => keycloak.accountManagement()
  const logout = () => keycloak.logout().then(() => navigate('/login'))

  const pageItems = [
    {
      logo: <MilitaryTechOutlined />,
      onClick: () => window.location.pathname !== '/militaries' && navigate('/militaries'),
      text: t('militaries'),
    },
    {
      logo: <GroupsOutlined />,
      onClick: () => window.location.pathname !== '/formations' && navigate('/formations'),
      text: t('formations'),
    },
    {
      logo: <HomeOutlined />,
      onClick: () => window.location.pathname !== '/infrastructures' && navigate('/infrastructures'),
      text: t('infrastructures'),
    },
    {
      logo: <FlightOutlined />,
      onClick: () => window.location.pathname !== '/equipments' && navigate('/equipments'),
      text: t('equipments'),
    },
    {
      logo: <ShieldOutlined />,
      onClick: () => window.location.pathname !== '/weapons' && navigate('/weapons'),
      text: t('weapons'),
    },
    {
      logo: <ArticleOutlined />,
      onClick: () => window.location.pathname !== '/reports' && navigate('/reports'),
      text: t('reports'),
    },
  ]

  const accountItems = [
    {
      logo: <PersonOutlined />,
      onClick: goToAccount,
      text: t('profile'),
    },
    {
      logo: <LogoutOutlined />,
      onClick: logout,
      text: t('logout'),
    },
  ]

  useEffect(() => {
    updateWidth()
  }, [ref])

  useEffect(() => {
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const maxWidth = 1200
  const languages = ['ru', 'en']

  return (
    <Box ref={ref}>
      <AppBar color={'transparent'} position="sticky" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton onClick={goToMain} sx={{ display: 'flex', gap: 5 }}>
            <Box alt={''} component={'img'} src={logo} sx={{ height: '35px', width: 'auto' }} />
          </IconButton>

          {width > maxWidth && (
            <Box sx={{ display: 'flex', gap: '10px' }}>
              {pageItems.map((page) => (
                <Button onClick={page.onClick} sx={{ color: 'white', display: 'block', my: 2 }}>
                  {page.text}
                </Button>
              ))}
            </Box>
          )}

          <IconButton onClick={toggleDrawer}>
            {width > maxWidth ? <AccountCircleOutlined style={{ color: 'white' }} /> : <MenuOutlined style={{ color: 'white' }} />}
          </IconButton>

          <Drawer anchor={'right'} onClose={toggleDrawer} open={drawerOpen}>
            <Box>
              <List>
                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    width: '100%',
                  }}
                >
                  <ToggleButtonGroup
                    exclusive
                    onChange={async (_event, value) => {
                      await setLanguage(value)
                    }}
                    value={getLanguage()}
                  >
                    {languages.map((lang) => (
                      <ToggleButton sx={{ height: 40 }} value={lang}>
                        <p>{lang.toUpperCase()}</p>
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </div>
                <Divider />
                {accountItems.map((item) => (
                  <ListItem disablePadding>
                    <ListItemButton onClick={item.onClick}>
                      <ListItemIcon>{item.logo}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              {width <= maxWidth && (
                <>
                  <Divider />
                  <List>
                    {pageItems.map((item) => (
                      <ListItem disablePadding>
                        <ListItemButton onClick={item.onClick}>
                          <ListItemIcon>{item.logo}</ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
