export interface PageNumberProps {
  decrement: () => void
  increment: () => void
  page: number
  setPage: (newValue: number) => void
  size: number
}
