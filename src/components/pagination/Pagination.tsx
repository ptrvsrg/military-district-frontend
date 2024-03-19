import { useTranslation } from 'react-i18next'

import arrowLeft from '../../assets/arrow_left.svg'
import arrowRight from '../../assets/arrow_right.svg'
import { PlainText } from '../text/Text.tsx'
import { ButtonWrapper, PaginationWrapper } from './Pagination.styled.ts'
import { PageNumberProps } from './Pagination.types.ts'

export function PageNumber(props: PageNumberProps) {
  const { t } = useTranslation()
  return (
    <PaginationWrapper>
      <PlainText size={props.size} text={`${t('page')}:`} />
      <PlainText size={props.size} text={`${props.page}`} />
      <ButtonWrapper>
        <a onClick={() => props.decrement()}>
          <img alt={''} height={props.size * 0.8} src={arrowLeft} />
        </a>
        <a onClick={() => props.increment()}>
          <img alt={''} height={props.size * 0.8} src={arrowRight} />
        </a>
      </ButtonWrapper>
    </PaginationWrapper>
  )
}
