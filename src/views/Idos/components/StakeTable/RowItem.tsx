import BigNumber from 'bignumber.js'
import useStakeLock from 'views/Idos/hooks/useStakeLock'
import { Flex, Text, useModal } from 'luastarter-uikits'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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

const titleNetwork = {
  '88': 'tomochain',
  '1': 'ethereum',
}

const RowItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [valueTokenToLua, setValueTokenToLua] = useState(0)
  const { chainId: cid } = useWeb3React()
  const { onUnStakeLock } = useStakeLock(lockLPAddressOBJ[cid], item?.address)
  const { onGetTokensLock } = useGetTokensLock()
  const [isLoading, setIsLoading] = useState(false)
  const { toastSuccess, toastError } = useToast()

  const isItemActiveOnNetwork = useMemo(() => {
    return cid === item.network
  }, [cid, item])
  const handleSetIsOpen = () => {
    if (isItemActiveOnNetwork) {
      setIsOpen(!isOpen)
    }
  }
  const onMaxBtnClick = () => {
    setInputValue(item.quantity)
  }

  const onChangeInput = (e) => {
    setInputValue(e.target.value)
  }

  const onHandleUnStakeLock = useCallback(async () => {
    if (new Date().getTime() < item.unlockAt * 1000) {
      toastError(`It’s not yet time to withdraw. You can unstake at ${item.unlockAtDate}${item.unlockAtTime}`)
    } else {
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
        toastError('Unstake failed')
      }
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
        <TD justifyContent="flex-start" width="15%">
          <Text fontSize="14px" color={isItemActiveOnNetwork ? '#D8D8D8' : '#606060'}>
            {item.name}
          </Text>
        </TD>
        <TD justifyContent="flex-end" width="20%">
          <Text fontSize="14px" color={isItemActiveOnNetwork ? '#D8D8D8' : '#606060'}>
            {item.quantity}
          </Text>
        </TD>
        <TD justifyContent="flex-end" width="22%">
          <Text fontSize="14px" color={isItemActiveOnNetwork ? '#D8D8D8' : '#606060'}>
            {item.luaEstimate}
          </Text>
        </TD>
        <TD justifyContent="flex-end" width="23%">
          <Flex flexDirection="column" alignItems="flex-end">
            <Text fontSize="14px" color={isItemActiveOnNetwork ? '#D8D8D8' : '#606060'}>
              {item.unlockAtDate}
            </Text>
            <Text fontSize="12px" color={isItemActiveOnNetwork ? '#D8D8D8' : '#606060'}>
              {item.unlockAtTime}
            </Text>
          </Flex>
        </TD>
        <TD justifyContent="flex-end" width="15%">
          <img src={`${process.env.PUBLIC_URL}/images/${titleNetwork[item.network]}.png`} alt="empty" />
        </TD>
        <TD justifyContent="flex-end" width="5%">
          {isItemActiveOnNetwork && (
            <Arrow isOpen={isOpen} src={`${process.env.PUBLIC_URL}/images/arr-down.png`} alt="" />
          )}
        </TD>
      </TR>
      {isOpen && (
        <TR>
          <TD justifyContent="flex-start" width="auto">
            {/* <Text fontSize="14px">The rest: 1,000 xLua ≈ 2,000 Lua</Text> */}
          </TD>
          <TD justifyContent="space-between" width="auto">
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
