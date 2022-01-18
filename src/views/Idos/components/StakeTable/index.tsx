import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import { Text } from 'luastarter-uikits'
import React, { Component, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectEstTotalLua, selectTokensLock } from 'state/stake'
import { getTokensAccept, getUserTokensLock } from 'state/stake/getStake'
import { getBalanceAmount, getBalanceNumber, getDecimalAmount } from 'utils/formatBalance'
import { getUtcDateString } from 'utils/formatTime'
import useGetTokensLock from 'views/Idos/hooks/useGetTokensLock'
import RowItem from './RowItem'
import { Arrow, Table, TBody, TD, TextHeader, TFooter, THead, TR } from './StakeTableStyled'

const StakeTable: React.FC = () => {
  const { onGetTokensLock } = useGetTokensLock()
  const { account, chainId } = useWeb3React()
  const tokensLock = useSelector(selectTokensLock)
  const estTotalLua = useSelector(selectEstTotalLua)

  useEffect(() => {
    if (account) {
      onGetTokensLock()
    }
  }, [onGetTokensLock, account])

  return (
    <Table>
      <THead>
        <TR>
          <TD justifyContent="flex-start" width="23%">
            <TextHeader fontSize="12px">TOKEN</TextHeader>
          </TD>
          <TD justifyContent="flex-end" width="21%">
            <TextHeader fontSize="12px">QUANTITY</TextHeader>
          </TD>
          <TD justifyContent="flex-end" width="21%">
            <TextHeader fontSize="12px">ESTIMATE LUA</TextHeader>
          </TD>
          <TD justifyContent="flex-end" width="28%">
            <TextHeader fontSize="12px">LOCKED UNTIL</TextHeader>
          </TD>
          <TD justifyContent="flex-end" width="7%" />
        </TR>
      </THead>
      <TBody>
        {tokensLock.map((row, index) => (
          <RowItem item={row} key={index.toString()} />
        ))}
      </TBody>
      <TFooter>
        <TR>
          <TD justifyContent="flex-start" width="23%">
            <Text fontSize="12px">Total</Text>
          </TD>
          <TD justifyContent="flex-end" width="21%" />
          <TD justifyContent="flex-end" width="21%">
            <Text fontSize="12px">{estTotalLua}</Text>
          </TD>
          <TD justifyContent="flex-end" width="28%" />
          <TD justifyContent="flex-end" width="7%" />
        </TR>
      </TFooter>
    </Table>
  )
}

export default StakeTable
