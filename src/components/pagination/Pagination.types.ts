export interface PaginationProps {
  page: number
  pageCount: number
  setPage: (value: number) => void
  setPageCount: (value: number) => void
  size: number
}
