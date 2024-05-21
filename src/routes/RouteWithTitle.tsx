import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function RouteWithTitle({ children, title }: { children: ReactNode; title: string }) {
  const { t } = useTranslation()
  useEffect(() => {
    document.title = title ? `${t('appTitle')} | ${title}` : `${t('appTitle')}`
  }, [title])
  return children
}
