import BigNumber from 'bignumber.js'
import useStakeLock from 'views/Idos/hooks/useStakeLock'
import { Text } from 'luastarter-uikits'
import React, { useCallback, useEffect, useState } from 'react'
import { BIG_TEN } from 'utils/bigNumber'
import useGetTokensLock from 'views/Idos/hooks/useGetTokensLock'
import {
  Arrow,
  InputOnRow,
  MaxButtom,
  SecondaryButtonRowItem,
  TD,
  TR,
  WrapperRow,
  WrappInputOnRow,
} from './StakeTableStyled'

const RowItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [valueTokenToLua, setValueTokenToLua] = useState(0)
  const { onUnStakeLock } = useStakeLock('0x0a875D0cE6c8A6C49FCC848974C60d73f83CEcB6', item?.address)
  const { onGetTokensLock } = useGetTokensLock()

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen)
  }
  const onMaxBtnClick = () => {
    setInputValue(item.quantity)
  }

  const onChangeInput = (e) => {
    setInputValue(e.target.value)
  }

  const handleUnStakeLock = useCallback(async () => {
    try {
      await onUnStakeLock(item.index, new BigNumber(inputValue).times(BIG_TEN.pow(item.decimals || 18)).toString())
      await onGetTokensLock()
      setInputValue('')
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }, [onUnStakeLock, inputValue, onGetTokensLock])

  const handleKeyPress = (event) => {
    if (!/[0-9.]/.test(event.key)) {
      event.preventDefault()
    }
    if (event.key === '.' && event.target.value.split('').filter((char) => char === '.').length === 1) {
      event.preventDefault()
    }
  }
  return (
    <WrapperRow>
      <TR onClick={handleSetIsOpen}>
        <TD justifyContent="flex-start" width="23%">
          <Text fontSize="12px">{item.name}</Text>
        </TD>
        <TD justifyContent="flex-end" width="21%">
          <Text fontSize="12px">{item.quantity}</Text>
        </TD>
        <TD justifyContent="flex-end" width="21%">
          <Text fontSize="12px">{item.luaEstimate}</Text>
        </TD>
        <TD justifyContent="flex-end" width="28%">
          <Text fontSize="12px">{item.unlockAt}</Text>
        </TD>
        <TD justifyContent="flex-end" width="7%">
          <Arrow isOpen={isOpen} src={`${process.env.PUBLIC_URL}/images/arr-down.png`} alt="" />
        </TD>
      </TR>
      {isOpen && (
        <TR>
          <TD justifyContent="flex-start" width="50%">
            {/* <Text fontSize="12px">The rest: 1,000 xLua ≈ 2,000 Lua</Text> */}
          </TD>
          <TD justifyContent="space-between" width="50%">
            <WrappInputOnRow>
              <InputOnRow
                type="text"
                scale="sm"
                placeholder="Quantity"
                value={inputValue}
                onChange={onChangeInput}
                onKeyPress={handleKeyPress}
              />
              <MaxButtom onClick={() => onMaxBtnClick()}>Max</MaxButtom>
            </WrappInputOnRow>
            <SecondaryButtonRowItem scale="sm" mb="15px">
              <Text fontSize="10px" color="#FABC46" onClick={handleUnStakeLock}>
                UNSTAKE
              </Text>
            </SecondaryButtonRowItem>
          </TD>
        </TR>
      )}
    </WrapperRow>
  )
}

export default RowItem
