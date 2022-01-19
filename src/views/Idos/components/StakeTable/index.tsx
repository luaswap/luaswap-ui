import { useWeb3React } from '@web3-react/core'
import { Spinner, Text } from 'luastarter-uikits'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectEstTotalLua, selectIsLoadingStakeTable, selectTokensLock } from 'state/stake'
import useGetTokensLock from 'views/Idos/hooks/useGetTokensLock'
import RowItem from './RowItem'
import { Table, TBody, TD, TextHeader, TFooter, THead, TR, WrapperLoadingTable } from './StakeTableStyled'

const StakeTable: React.FC = () => {
  const { onGetTokensLock } = useGetTokensLock()
  const { account, chainId } = useWeb3React()
  const tokensLock = useSelector(selectTokensLock)
  const estTotalLua = useSelector(selectEstTotalLua)
  const isLoadingStakeTable = useSelector(selectIsLoadingStakeTable)

  useEffect(() => {
    if (account) {
      onGetTokensLock()
    }
  }, [onGetTokensLock, account])

  return (
    <>
      {isLoadingStakeTable ? (
        <WrapperLoadingTable>
          <Spinner />
        </WrapperLoadingTable>
      ) : (
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
      )}
    </>
  )
}

export default StakeTable
