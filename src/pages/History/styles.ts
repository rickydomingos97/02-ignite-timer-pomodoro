import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  // div para poder gerar scrool lateral no mobile
  //flex: 1;
  //overflow: auto; //para poder gerar scrool lateral no mobile
  margin-top: 2rem;

  height: 356px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    background: transparent;
  }

  ::-webkit-scrollbar-track {
    border-radius: 100vw;
    //background: #505059;
  }

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
const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const
/* isso diz ao js que essa propriedade nao pode receber um valor string aleatorio 
o as const eh necessario par anao poder receber um valor de string aleatorio */

/** interface criada para passar as cors dos status como propriedades  */
interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
} /*
  statusColor: 'yellow' | 'green' | 'red' pode ser trocado por:
  statusColor: keyof typeof STATUS_COLORS, isso ajuda a podermos adicionar mais cores de forma mais dinamica na interface
*/

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) =>
      props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
