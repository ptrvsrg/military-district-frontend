import { useState } from 'react'

import { PageNumber as PageNumberComponent } from '../Pagination.tsx'
import { PageNumberProps } from '../Pagination.types.ts'

export default {
  component: PageNumberComponent,
  parameters: {
    layout: 'padded',
  },
  title: 'Components/Pagination',
}

const Template = (props: PageNumberProps) => {
  const [page, setPage] = useState(0)
  props.page = page
  props.increment = () => setPage(page + 1)
  props.decrement = () => {
    if (page > 0) setPage(page - 1)
  }

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
        <PageNumberComponent {...props} />
        <p style={{ color: 'white' }}>
          <b>Page:</b> {page}
        </p>
      </div>
    </>
  )
}

export const PageNumber = Template.bind({})
// @ts-ignore
PageNumber.args = {
  size: 18,
}
