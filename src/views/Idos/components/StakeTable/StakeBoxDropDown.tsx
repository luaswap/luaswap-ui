import { Text } from 'luastarter-uikits'
import React, { Component, useState } from 'react'
import {
  DropDownInput,
  DropDownStakeWrapp,
  DropDownValue,
  Overlay,
  SelectItemDropDown,
  SelectSectionDropDown,
} from './StakeTableStyled'

const options = ['Select an Option', 'First Option', 'Second Option', 'Third Option']

const StakeBoxDropDown = () => {
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const closeSelectBox = () => {
    setIsOpen(false)
  }

  const onChange = (e) => {
    setValue(e)
    closeSelectBox()
  }

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <DropDownStakeWrapp>
      <DropDownInput onClick={handleOpen}>
        <DropDownValue>{value || 'Token'}</DropDownValue>
        <img src={`${process.env.PUBLIC_URL}/images/arr-down-stake-dropdown.png`} alt="" />
      </DropDownInput>
      {isOpen && (
        <SelectSectionDropDown>
          <SelectItemDropDown onClick={() => onChange('xLua')}>
            <Text>xLua</Text>
          </SelectItemDropDown>
          <SelectItemDropDown onClick={() => onChange('LP Token')}>
            <Text>LP Token</Text>
          </SelectItemDropDown>
        </SelectSectionDropDown>
      )}
      {isOpen && <Overlay onClick={closeSelectBox} />}
    </DropDownStakeWrapp>
  )
}

export default StakeBoxDropDown
