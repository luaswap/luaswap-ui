import { Input, Text } from 'luastarter-uikits'
import React, { Component, useState } from 'react'
import { Arrow, InputOnRow, MaxButtom, SecondaryButtonRowItem, TD, TR, WrappInputOnRow } from './StakeTableStyled'

const RowItem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleSetIsOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div>
      <TR onClick={handleSetIsOpen}>
        <TD justifyContent="flex-start" width="23%">
          <Text fontSize="12px">LP Token</Text>
        </TD>
        <TD justifyContent="flex-end" width="21%">
          <Text fontSize="12px">5000</Text>
        </TD>
        <TD justifyContent="flex-end" width="21%">
          <Text fontSize="12px">7000</Text>
        </TD>
        <TD justifyContent="flex-end" width="28%">
          <Text fontSize="12px">12/12/2021</Text>
        </TD>
        <TD justifyContent="flex-end" width="7%">
          <Arrow isOpen={isOpen} src={`${process.env.PUBLIC_URL}/images/arr-down.png`} alt="" />
        </TD>
      </TR>
      {isOpen && (
        <TR>
          <TD justifyContent="flex-start" width="50%">
            <Text fontSize="12px">The rest: 1,000 xLua ≈ 2,000 Lua</Text>
          </TD>
          <TD justifyContent="space-between" width="50%">
            <WrappInputOnRow>
              <InputOnRow type="text" scale="sm" placeholder="Quantity" />
              <MaxButtom>Max</MaxButtom>
            </WrappInputOnRow>
            <SecondaryButtonRowItem scale="sm" mb="15px">
              <Text fontSize="10px" color="#FABC46">
                UNSTAKE
              </Text>
            </SecondaryButtonRowItem>
          </TD>
        </TR>
      )}
    </div>
  )
}

export default RowItem
