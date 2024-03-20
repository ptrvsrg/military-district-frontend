import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import arrowLeft from '../../assets/arrow_left.svg'
import arrowRight from '../../assets/arrow_right.svg'
import { Color } from '../../styles/ts/colors.ts'
import { PlainText } from '../text/Text.tsx'
import { ButtonWrapper, Input, PaginationWrapper } from './Pagination.styled.ts'
import { PaginationProps } from './Pagination.types.ts'

export function Pagination(props: PaginationProps) {
  const { page, pageCount, setPage, setPageCount } = props
  const { t } = useTranslation()
  const [pageInput, setPageInput] = useState(`${page}`)
  const [pageCountInput, setPageCountInput] = useState(`${pageCount}`)

  const increment = () => {
    if (page < pageCount) {
      setPageInput(`${page + 1}`)
      setPage(page + 1)
    }
  }
  const decrement = () => {
    if (page > 1) {
      setPageInput(`${page - 1}`)
      setPage(page - 1)
    }
  }

  const onChangePage = (event) => {
    if (/^\d+$/.test(event.target.value) && Number(event.target.value) <= pageCount) {
      setPageInput(event.target.value)
      setPage(Number(event.target.value))
    }
    if (event.target.value.length === 0) {
      setPageInput('')
      setPage(1)
    }
  }

  const onBlurPage = (event) => {
    if (event.target.value.length === 0) {
      setPageInput('1')
      setPage(1)
    }
  }

  const onChangePageCount = (event) => {
    if (/^\d+$/.test(event.target.value)) {
      setPageCountInput(event.target.value)
      setPageCount(Number(event.target.value))
    }
    if (event.target.value.length === 0) {
      setPageCountInput('')
      setPageCount(1)
    }
  }

  const onBlurPageCount = (event) => {
    if (event.target.value.length === 0) {
      setPageCountInput('1')
      setPageCount(1)
      setPageInput('1')
      setPage(1)
      // eslint-disable-next-line sonarjs/elseif-without-else
    } else if (page > pageCount) {
      console.log(`${page} ${pageCount}`)
      console.log(`${pageInput} ${pageCountInput}`)
      setPageInput(pageCountInput)
      setPage(pageCount)
    }
  }

  return (
    <PaginationWrapper>
      <PlainText size={props.size} text={`${t('page')}:`} />
      <Input
        fontSize={props.size}
        onBlur={onBlurPage}
        onChange={onChangePage}
        size={pageInput.length === 0 ? 1 : pageInput.length}
        value={pageInput}
      />
      <span style={{ color: Color.WHITE }}>/</span>
      <Input
        fontSize={props.size}
        onBlur={onBlurPageCount}
        onChange={onChangePageCount}
        size={pageCountInput.length === 0 ? 1 : pageCountInput.length}
        value={pageCountInput}
      />
      <ButtonWrapper>
        <a onClick={decrement}>
          <img alt={''} height={props.size * 0.8} src={arrowLeft} />
        </a>
        <a onClick={increment}>
          <img alt={''} height={props.size * 0.8} src={arrowRight} />
        </a>
      </ButtonWrapper>
    </PaginationWrapper>
  )
}
