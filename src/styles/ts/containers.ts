import styled from 'styled-components'

export const ColumnContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  gap: 20px;
`

export const RowContent = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 90px);
  box-sizing: border-box;
  gap: 20px;
`

export const RowWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  height: max-content;
`

export const ColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: max-content;
  gap: 15px;
`

export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  height: 100vh;
`

export const InlineWrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`
