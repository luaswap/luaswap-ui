import { Text } from 'luastarter-uikits'
import React, { useState } from 'react'
import {
  DropDownInput,
  DropDownStakeWrapp,
  DropDownValue,
  Overlay,
  SelectItemDropDown,
  SelectSectionDropDown,
} from './StakeTableStyled'

const options = ['Select an Option', 'First Option', 'Second Option', 'Third Option']

const StakeBoxDropDown = ({ tokensAccept, tokenSelected, setTokenSelected }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeSelectBox = () => {
    setIsOpen(false)
  }

  const onChange = (e) => {
    setTokenSelected(e)
    closeSelectBox()
  }

  const handleOpen = () => {
    if (tokensAccept?.length > 0) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <DropDownStakeWrapp>
      <DropDownInput onClick={handleOpen} disabled={tokensAccept?.length < 1}>
        <DropDownValue disabled={tokensAccept?.length < 1}>{tokenSelected?.name || 'Token'}</DropDownValue>
        <img src={`${process.env.PUBLIC_URL}/images/arr-down-stake-dropdown.png`} alt="" />
      </DropDownInput>
      {isOpen && (
        <SelectSectionDropDown>
          {tokensAccept.map((token) => (
            <SelectItemDropDown onClick={() => onChange(token)} key={token.address}>
              {token.name}
            </SelectItemDropDown>
          ))}
        </SelectSectionDropDown>
      )}
      {isOpen && <Overlay onClick={closeSelectBox} />}
    </DropDownStakeWrapp>
  )
}

export default StakeBoxDropDown
