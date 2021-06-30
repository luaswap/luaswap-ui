import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { LinkExternal, Text } from 'common-uikitstrungdao'

import { ApiDetailType } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import TokenLogo from './TokenLogo'

interface TableProps {
  tag: string
  network?: string
  columns: Array<string[]>
  data: ApiDetailType[]
}

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
    padding: 10px 50px 10px 0;
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
const TokenTable: React.FC<TableProps> = ({ data, columns, tag }) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  
  const renderContent = (row, type: string) => {
    switch (type) {
      case 'balance':        
        return (
          parseFloat(row.usd) > 0 &&
          <tr key={row.amount}>
            <StyleTd>
              <CellInner>
                <TokenLogo address={row.address} url={row.imgs[0]} name={row.tokenName}  />
                <LinkExternal href={row.link}>
                  <TokenName>{row.tokenName}</TokenName>
                </LinkExternal>
              </CellInner>
            </StyleTd>
            <StyleTd>
              <Text>
                {parseFloat(row.quantity).toFixed(4)} {row.symbol}
              </Text>
            </StyleTd>
            {/* <StyleTd><Text> {row.symbol}</Text></StyleTd> */}
            <StyleTd>
              <Text> {parseFloat(row.usd).toFixed(2)}</Text>
            </StyleTd>
          </tr>
        )
      case 'luaswapliquidity':
        return (
          <tr key={row.amount}>
            <StyleTd>
              <CellInner>
                <TokenIcon src={row.imgs[0]} alt={row.token0.symbol} />
                <TokenIcon src={row.imgs[1]} alt={row.token1.symbol} />
                <LinkExternal href={row.link}>
                  <TokenName>{row.tokenName}</TokenName>
                </LinkExternal>
              </CellInner>
            </StyleTd>
            <StyleTd>
              <Text>{row.balance} </Text>
            </StyleTd>
            <StyleTd>
              <Text> {row.poolSharePercent}</Text>
            </StyleTd>
            <StyleTd>
              <Text> {row.usd}</Text>
            </StyleTd>
          </tr>
        )
      case 'LuaSafe':
        return (
          <tr key={row.amount}>
            <StyleTd>
              <Text>{`${row.address.substring(0, 6)}...${row.address.substring(
                row.address.length - 4,
                row.address.length,
              )}`}</Text>
            </StyleTd>
            <StyleTd>
              <Text>{row.token} </Text>
            </StyleTd>
            <StyleTd>
              <Text> {parseFloat(row.quantity).toFixed(2)}</Text>
            </StyleTd>
            <StyleTd>
              <Text> {row.apy}</Text>
            </StyleTd>
            <StyleTd>
              <Text> {parseFloat(row.luaEstimate).toFixed(2)}</Text>
            </StyleTd>
          </tr>
        )
      case 'LuaFarm':
        return (
          <tr key={row.stakeAmount}>
            <StyleTd>
              <Text>{row.pair}</Text>
            </StyleTd>
            <StyleTd>
              <Text>{parseFloat(row.stakeAmount).toFixed(2)} </Text>
            </StyleTd>
            <StyleTd>
              <Text> {parseFloat(row.pendingReward).toFixed(2)}</Text>
            </StyleTd>
          </tr>
        )
      default:
        return null
    }
  }
  return (
    <TableContainer>
      <TableWrapper ref={tableWrapperEl}>
        <StyledTable>
          <TableHead>
            <tr>
              {columns.map((i) => {
                return (
                  <th key={i[1]}>
                    <Text> {i[0]} </Text>
                  </th>
                )
              })}
            </tr>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return renderContent(row, tag)
            })}
          </TableBody>
        </StyledTable>
      </TableWrapper>
    </TableContainer>
  )
}

export default TokenTable
