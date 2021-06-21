import React, { useRef } from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'

// import { DetailType } from 'state/types'
import { LinkExternal } from 'common-uikitstrungdao'
import { useTranslation } from 'contexts/Localization'
import Spacer from 'components/Spacer'

// interface TableProps {
//     head: Array<string[]>
//     body: DetailType[]
// }

// export interface LTableProps {
//     data: Array<any>
//     columns: Array<any>
// }

// const Container = styled.div`
//   filter: ${({ theme }) => theme.card.dropShadow};
//   width: 100%;
//   background: ${({ theme }) => theme.card.background};
//   border-radius: 16px;
//   margin: 16px 0px;
// `

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`
const TableHead = styled.thead`
  text-align: left;
  font-size: 18px;
  th {
    padding: 10px 20px 10px 0;
  }
`
const TableBody = styled.tbody`
  & tr {
  }
`

const TableContainer = styled.div`
  position: relative;
`

const StyleTd = styled.td`
  padding: 15px 30px 15px 0;
  font-size: 16px;
  vertical-align: middle;
`

const CellInner = styled.div`
  display: flex;
  align-items: center;
`
const TokenIcon = styled.img`
  max-width: 32px;
  margin-right: 10px;
`
const TokenName = styled.span``
const Table: React.FC = () => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const data = [
    {
      imgs: ['https://etherscan.io/token/images/addxyz_32.png'],
      link: 'https://etherscan.io/token/0x635d081fd8f6670135d8a3640e2cf78220787d56',
      tokenName: 'ADD',
      symbol: 'ADD',
      address: '0x635d081fd8f6670135d8a3640e2cf78220787d56',
      amount: '613.8751923 ADD',
      usd: '156.86 USD',
    },
    {
      imgs: ['https://etherscan.io/token/images/tomochain_32.png'],
      link: 'https://etherscan.io/token/0x05D3606d5c81EB9b7B18530995eC9B29da05FaBa',
      tokenName: 'TomoChain',
      symbol: 'TOMOE',
      address: '0x05D3606d5c81EB9b7B18530995eC9B29da05FaBa',
      amount: '11.02038385 TOMOE',
      usd: '17.85 USD',
    },
  ]
  const columns = [
    ['Token', 'tokenName'],
    ['Amount', 'amount'],
    ['Symbol', 'symbol'],
    ['USD', 'usd'],
  ]
  return (
    // <Container>
    <TableContainer>
      <Text fontSize="16px" color="#657795" marginBottom="15px">
        Ethereum
      </Text>
      <TableWrapper ref={tableWrapperEl}>
        <StyledTable>
          <TableHead>
            <tr>
              {columns.map((i) => {
                return <th key={i[1]}> {i[0]}</th>
              })}
            </tr>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <tr key={row.amount}>
                  <StyleTd>
                    <CellInner>
                      <TokenIcon src={row.imgs[0]} alt={row.tokenName} />
                      <LinkExternal href={row.link}>
                        <TokenName>{row.tokenName}</TokenName>
                      </LinkExternal>
                    </CellInner>
                  </StyleTd>
                  <StyleTd> {row.amount}</StyleTd>
                  <StyleTd> {row.symbol}</StyleTd>
                  <StyleTd> {row.usd}</StyleTd>
                </tr>
              )
            })}
          </TableBody>
        </StyledTable>
      </TableWrapper>
    </TableContainer>
    // </Container>
  )
}

export default Table
