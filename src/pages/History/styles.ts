import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.125rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  // div para poder gerar scrool lateral no mobile
  flex: 1;
  overflow: auto; //para poder gerar scrool lateral no mobile
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left; // por padrao eh center
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem; //14px
      line-height: 1.6rem;

      &:first-child {
        border-top-left-radius: 8px;
        pading-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        pading-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      height: 3.375rem;
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        pading-left: 1.5rem;
      }

      &:last-child {
        pading-right: 1.5rem;
      }
    }
  }
`
