import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from '../assets/locales/en/translation.json'
import translationRU from '../assets/locales/ru/translation.json'
import { projectConfig } from './ProjectStore.ts'

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
}

export const getLanguage = () => localStorage.getItem('military-district-language') ?? 'ru'
export const setLanguage = async (lng: string) => {
  localStorage.setItem('military-district-language', lng)
  await i18n.changeLanguage(lng)
}

i18n.use(initReactI18next).init({
  debug: projectConfig.mode === 'development',
  fallbackLng: getLanguage(),
  resources,
})

export { default } from 'i18next'
