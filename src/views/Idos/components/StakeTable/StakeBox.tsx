import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useApprove } from 'hooks/useApprove'
import { useApproveIdo } from 'hooks/useApproveIdo'
import useStakeLock from 'views/Idos/hooks/useStakeLock'
import { useTokenBalance } from 'hooks/useTokenBalance'
import { Text, useModal } from 'luastarter-uikits'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getTokensAccept } from 'state/stake/getStake'
import { BIG_TEN } from 'utils/bigNumber'
import { getERC20Contract } from 'utils/contractHelpers'
import useIsApproved from 'views/Idos/hooks/useIsApproved'
import { Contract } from 'web3-eth-contract'
import useGetTokensLock from 'views/Idos/hooks/useGetTokensLock'
import useToast from 'hooks/useToast'
import { useAppDispatch } from 'state'
import { setLockDuration } from 'state/stake'
import StakeBoxDropDown from './StakeBoxDropDown'
import {
  ButtonStakeBox,
  InputOnStakeBox,
  MaxButtomOnStakeBox,
  StakeBoxCard,
  WrappInputOnStakeBox,
} from './StakeTableStyled'
import ConfirmModal from './ConfirmModal'

interface TokenSelectedModel {
  address: string
  name: string
  decimals: number
}

const StakeBox = () => {
  const [tokensAccept, setTokensAccept] = useState([])
  const [tokenSelected, setTokenSelected] = useState(null as TokenSelectedModel)
  const [inputValue, setInputValue] = useState('')
  const [paytokenContract, setPayTokenContract] = useState({} as Contract)
  const tokenValue = useTokenBalance(tokenSelected ? tokenSelected?.address : '')
  const [isLoading, setIsLoading] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const dispath = useAppDispatch()

  const { onGetTokensLock } = useGetTokensLock()

  const { account, library, chainId: cid } = useWeb3React()

  const [isApproved, fetchAllowanceData, isLoadingApproveStatus] = useIsApproved(
    paytokenContract,
    '0x0a875D0cE6c8A6C49FCC848974C60d73f83CEcB6',
  )

  const { onApprove } = useApproveIdo(paytokenContract, '0x0a875D0cE6c8A6C49FCC848974C60d73f83CEcB6')
  const { onStakeLock } = useStakeLock(
    '0x0a875D0cE6c8A6C49FCC848974C60d73f83CEcB6',
    tokenSelected ? tokenSelected?.address : '',
  )

  useEffect(() => {
    clearInputValue()
    if (tokenSelected) {
      setPayTokenContract(getERC20Contract(library, tokenSelected?.address, cid))
    }
  }, [tokenSelected])

  const tokenPrice = useMemo(() => {
    if (tokenValue) {
      return tokenValue.toNumber()
    }

    return 0
  }, [tokenValue])
  const handleGetTokensAccept = async () => {
    try {
      const data = await getTokensAccept()
      setTokensAccept(data[cid]?.tokens || [])
      dispath(setLockDuration(data[cid]?.lockDuration || 0))
      return data
    } catch (e) {
      return false
    }
  }

  const handleApprove = useCallback(async () => {
    try {
      await onApprove()
      fetchAllowanceData()
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, fetchAllowanceData])

  const handleSubmitStake = useCallback(async () => {
    try {
      await onStakeLock(new BigNumber(inputValue).times(BIG_TEN.pow(tokenSelected.decimals || 18)).toString())
      await onGetTokensLock()
      setTokenSelected(null)
      toastSuccess('Stake Successfully')
    } catch (error) {
      console.error(error)
      toastError('Stake faild')
    }
  }, [onStakeLock, inputValue])

  const clearInputValue = () => {
    setInputValue('')
  }

  useEffect(() => {
    if (cid?.toString()) {
      handleGetTokensAccept()
    }
  }, [cid])

  const onChangeInput = (e) => {
    setInputValue(e.target.value)
  }

  const onClickMax = () => {
    setInputValue(tokenPrice.toString())
  }

  const onStakeToken = async () => {
    setIsLoading(true)
    if (!isApproved) {
      await handleApprove()
      await handleSubmitStake()
    } else {
      await handleSubmitStake()
    }
    setIsLoading(false)
  }

  const [onPresentConfirmation] = useModal(
    <ConfirmModal onConfirm={onStakeToken} token={tokenSelected} quantity={inputValue} isStake />,
    false,
  )

  const onClickButtonStake = async () => {
    if (Number(inputValue) <= Number(tokenPrice)) {
      onPresentConfirmation()
    } else {
      toastError('Max value enter is balance of token')
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
    <StakeBoxCard>
      <Text fontSize="14px">Estimate: 10,000 Lua</Text>
      <WrappInputOnStakeBox>
        <InputOnStakeBox
          type="text"
          scale="md"
          placeholder="Quantity"
          value={inputValue}
          onChange={onChangeInput}
          onKeyPress={handleKeyPress}
        />
        <MaxButtomOnStakeBox onClick={onClickMax}>Max</MaxButtomOnStakeBox>
      </WrappInputOnStakeBox>
      <StakeBoxDropDown tokensAccept={tokensAccept} tokenSelected={tokenSelected} setTokenSelected={setTokenSelected} />
      <ButtonStakeBox scale="md" onClick={onClickButtonStake} disabled={isLoading || !inputValue || !tokenSelected}>
        {!isLoading ? 'Stake' : 'Staking...'}
      </ButtonStakeBox>
    </StakeBoxCard>
  )
}

export default StakeBox
