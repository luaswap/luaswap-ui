import React, { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { Spinner, Text } from 'luastarter-uikits'
import { selectEstTotalLua, selectIsLoadingStakeTable, selectTier, selectTokensLock } from 'state/stake'
import RowItem from './RowItem'
import LoaderIcon from './StakeSpinner'
import { Table, TBody, TD, TextHeader, TFooter, THead, TierStamp, TR, WrapperLoadingTable } from './StakeTableStyled'

const StakeTable: React.FC = () => {
  const { account, chainId } = useWeb3React()
  const tokensLock = useSelector(selectTokensLock)
  const estTotalLua = useSelector(selectEstTotalLua)
  const isLoadingStakeTable = useSelector(selectIsLoadingStakeTable)
  const tier = useSelector(selectTier)

  const isOnRightNetWork = useMemo(() => {
    return chainId === 1 || chainId === 88
  }, [chainId])

  return (
    <>
      {isLoadingStakeTable ? (
        <WrapperLoadingTable>
          <LoaderIcon />
        </WrapperLoadingTable>
      ) : (
        <div
          style={{
            overflowX: 'auto',
            width: '100%',
          }}
        >
          <Table>
            <THead>
              <TR>
                <TD justifyContent="flex-start" width="15%">
                  <TextHeader fontSize="12px">TOKEN</TextHeader>
                </TD>
                <TD justifyContent="flex-end" width="20%">
                  <TextHeader fontSize="12px">QUANTITY</TextHeader>
                </TD>
                <TD justifyContent="flex-end" width="22%">
                  <TextHeader fontSize="12px">ESTIMATE LUA</TextHeader>
                </TD>
                <TD justifyContent="flex-end" width="23%">
                  <TextHeader fontSize="12px">LOCKED UNTIL</TextHeader>
                </TD>
                <TD justifyContent="flex-end" width="15%">
                  <TextHeader fontSize="12px">NETWORK</TextHeader>
                </TD>
                <TD justifyContent="flex-end" width="5%" />
              </TR>
            </THead>
            <TBody>
              {tokensLock.map((row, index) => (
                <RowItem item={row} />
              ))}
            </TBody>
            <TFooter>
              <TR>
                <TD justifyContent="flex-start" width="15%">
                  <Text fontSize="14px" fontWeight="900" color={isOnRightNetWork ? '#D8D8D8' : '#606060'}>
                    Total
                  </Text>
                </TD>
                <TD justifyContent="flex-end" width="20%" />
                <TD justifyContent="flex-end" width="22%">
                  <TierStamp>
                    <Text fontSize="10px" fontWeight="bold" color="#8B8B8B">
                      TIER {tier}
                    </Text>
                  </TierStamp>
                  <Text fontSize="14px" color={isOnRightNetWork ? '#D8D8D8' : '#606060'} fontWeight="900">
                    {estTotalLua}
                  </Text>
                </TD>
                <TD justifyContent="flex-end" width="23%" />
                <TD justifyContent="flex-end" width="15%" />
                <TD justifyContent="flex-end" width="5%" />
              </TR>
            </TFooter>
          </Table>
        </div>
      )}
    </>
  )
}

export default StakeTable
