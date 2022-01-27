import { Spinner, Text } from 'luastarter-uikits'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectEstTotalLua, selectIsLoadingStakeTable, selectTier, selectTokensLock } from 'state/stake'
import RowItem from './RowItem'
import LoaderIcon from './StakeSpinner'
import { Table, TBody, TD, TextHeader, TFooter, THead, TierStamp, TR, WrapperLoadingTable } from './StakeTableStyled'

const StakeTable: React.FC = () => {
  const tokensLock = useSelector(selectTokensLock)
  const estTotalLua = useSelector(selectEstTotalLua)
  const isLoadingStakeTable = useSelector(selectIsLoadingStakeTable)
  const tier = useSelector(selectTier)

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
                <RowItem item={row} key={index.toString()} />
              ))}
            </TBody>
            <TFooter>
              <TR>
                <TD justifyContent="flex-start" width="15%">
                  <Text fontSize="12px">Total</Text>
                </TD>
                <TD justifyContent="flex-end" width="20%" />
                <TD justifyContent="flex-end" width="22%">
                  <TierStamp>
                    <Text fontSize="10px" fontWeight="bold" color="#8B8B8B">
                      TIER {tier}
                    </Text>
                  </TierStamp>
                  <Text fontSize="12px">{estTotalLua}</Text>
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
