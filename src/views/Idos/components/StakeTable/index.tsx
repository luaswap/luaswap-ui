import { Spinner, Text } from 'luastarter-uikits'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectEstTotalLua, selectIsLoadingStakeTable, selectTokensLock } from 'state/stake'
import RowItem from './RowItem'
import { Table, TBody, TD, TextHeader, TFooter, THead, TR, WrapperLoadingTable } from './StakeTableStyled'

const StakeTable: React.FC = () => {
  const tokensLock = useSelector(selectTokensLock)
  const estTotalLua = useSelector(selectEstTotalLua)
  const isLoadingStakeTable = useSelector(selectIsLoadingStakeTable)

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
              <TD justifyContent="flex-end" width="15%">
                <TextHeader fontSize="12px">QUANTITY</TextHeader>
              </TD>
              <TD justifyContent="flex-end" width="27%">
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
              <TD justifyContent="flex-end" width="15%" />
              <TD justifyContent="flex-end" width="27%">
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
