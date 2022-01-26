import BigNumber from 'bignumber.js'
import useStakeLock from 'views/Idos/hooks/useStakeLock'
import { Text, useModal } from 'luastarter-uikits'
import React, { useCallback, useEffect, useState } from 'react'
import { BIG_TEN } from 'utils/bigNumber'
import useGetTokensLock from 'views/Idos/hooks/useGetTokensLock'
import useToast from 'hooks/useToast'
import { useWeb3React } from '@web3-react/core'
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
import ConfirmModal from './ConfirmModal'
import { lockLPAddressOBJ } from './constants/lockLPContractAddress'
import LoaderIcon from './StakeSpinner'

const RowItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [valueTokenToLua, setValueTokenToLua] = useState(0)
  const { chainId: cid } = useWeb3React()
  const { onUnStakeLock } = useStakeLock(lockLPAddressOBJ[cid], item?.address)
  const { onGetTokensLock } = useGetTokensLock()
  const [isLoading, setIsLoading] = useState(false)
  const { toastSuccess, toastError } = useToast()

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen)
  }
  const onMaxBtnClick = () => {
    setInputValue(item.quantity)
  }

  const onChangeInput = (e) => {
    setInputValue(e.target.value)
  }

  const onHandleUnStakeLock = useCallback(async () => {
    try {
      setIsLoading(true)
      await onUnStakeLock(item.index, new BigNumber(inputValue).times(BIG_TEN.pow(item.decimals || 18)).toString())
      await onGetTokensLock()
      setInputValue('')
      setIsOpen(false)
      setIsLoading(false)
      toastSuccess('Unstake successfully')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toastError('Unstake faild')
    }
  }, [onUnStakeLock, inputValue, onGetTokensLock])

  const [onPresentConfirmation] = useModal(
    <ConfirmModal onConfirm={onHandleUnStakeLock} token={item} quantity={inputValue} />,
    false,
  )

  const onClickUnstakeButton = () => {
    if (Number(inputValue) <= Number(item.quantity)) {
      onPresentConfirmation()
    } else {
      toastError('Max value enter is quantity of token')
    }
  }

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
        <TD justifyContent="center" width="20%">
          <Text fontSize="12px">{item.quantity}</Text>
        </TD>
        <TD justifyContent="center" width="27%">
          <Text fontSize="12px">{item.luaEstimate}</Text>
        </TD>
        <TD justifyContent="flex-start" width="23%">
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
            <SecondaryButtonRowItem
              scale="sm"
              mb="15px"
              disabled={isLoading || !inputValue}
              onClick={onClickUnstakeButton}
            >
              <Text fontSize="10px" color="#FABC46">
                {!isLoading ? 'UNSTAKE' : <LoaderIcon innerWidth="20px" outerWidth="35px" />}
              </Text>
            </SecondaryButtonRowItem>
          </TD>
        </TR>
      )}
    </WrapperRow>
  )
}

export default RowItem
