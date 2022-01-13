import { Text } from 'luastarter-uikits'
import React, { Component } from 'react'
import RowItem from './RowItem'
import { Arrow, Table, TBody, TD, TextHeader, TFooter, THead, TR } from './StakeTableStyled'

const StakeTable: React.FC = () => {
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
        <RowItem />
      </TBody>
      <TFooter>
        <TR>
          <TD justifyContent="flex-start" width="23%">
            <Text fontSize="12px">Total</Text>
          </TD>
          <TD justifyContent="flex-end" width="21%" />
          <TD justifyContent="flex-end" width="21%">
            <Text fontSize="12px">14000</Text>
          </TD>
          <TD justifyContent="flex-end" width="28%" />
          <TD justifyContent="flex-end" width="7%" />
        </TR>
      </TFooter>
    </Table>
  )
}

export default StakeTable
