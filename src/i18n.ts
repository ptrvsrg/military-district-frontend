import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ru from './assets/locales/ru.json'

const resources = {
  ru,
}

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'ru',
  lng: 'ru',
  resources,
})

// @ts-ignore
export default 'i18next'
