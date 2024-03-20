import { useState } from 'react'

import { Pagination } from '../../../components/pagination/Pagination.tsx'
import { PaginationProps } from '../../../components/pagination/Pagination.types.ts'

export default {
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  title: 'Components/Pagination',
}

const Template = (props: PaginationProps) => {
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(10)
  props.page = page
  props.setPage = setPage
  props.pageCount = pageCount
  props.setPageCount = setPageCount

  return (
    <>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '90vh',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Pagination {...props} />
        <p style={{ color: 'white' }}>
          <b>Page:</b> {page}
        </p>
      </div>
    </>
  )
}

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  size: 18,
}
