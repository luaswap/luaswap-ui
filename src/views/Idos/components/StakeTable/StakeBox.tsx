import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useApprove } from 'hooks/useApprove'
import { useApproveIdo } from 'hooks/useApproveIdo'
import useStakeLock from 'views/Idos/hooks/useStakeLock'
import { useTokenBalance } from 'hooks/useTokenBalance'
import { Spinner, Text, useModal } from 'luastarter-uikits'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getTokensAccept, getValueTokenByLUA } from 'state/stake/getStake'
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
import { lockLPAddressOBJ } from './constants/lockLPContractAddress'
import LoaderIcon from './StakeSpinner'

interface TokenSelectedModel {
  address: string
  name: string
  decimals: number
}

const StakeBox = ({ isDisable }) => {
  const [tokensAccept, setTokensAccept] = useState([])
  const [tokenSelected, setTokenSelected] = useState(null as TokenSelectedModel)
  const [inputValue, setInputValue] = useState('')
  const [paytokenContract, setPayTokenContract] = useState({} as Contract)
  const tokenValue = useTokenBalance(tokenSelected ? tokenSelected?.address : '')
  const [estimateLuaQty, setEstimateLuaQty] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const dispath = useAppDispatch()

  const { onGetTokensLock } = useGetTokensLock()

  const { account, library, chainId: cid } = useWeb3React()

  const [isApproved, fetchAllowanceData, isLoadingApproveStatus] = useIsApproved(
    paytokenContract,
    lockLPAddressOBJ[cid],
  )

  const { onApprove } = useApproveIdo(paytokenContract, lockLPAddressOBJ[cid])
  const { onStakeLock } = useStakeLock(lockLPAddressOBJ[cid], tokenSelected ? tokenSelected?.address : '')

  useEffect(() => {
    clearInputValue()
    setEstimateLuaQty(0)
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
      setIsLoading(true)
      await onApprove()
      fetchAllowanceData()
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
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
      toastError('Stake failed')
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

  const onChangeInput = async (e) => {
    setInputValue(e.target.value)
    const data = await getValueTokenByLUA(tokenSelected?.address, cid, Number(e.target.value))
    setEstimateLuaQty(data?.estimateLuaQty || 0)
  }

  const onClickMax = () => {
    setInputValue(tokenPrice.toString())
  }

  const onStakeToken = async () => {
    setIsLoading(true)
    // if (!isApproved) {
    //   await handleApprove()
    //   await handleSubmitStake()
    // } else {
    //   await handleSubmitStake()
    // }
    await handleSubmitStake()
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
    <>
      {isDisable ? (
        <StakeBoxCard>
          <Text fontSize="14px">Estimate: {Number(estimateLuaQty).toFixed(3)} Lua</Text>
          <WrappInputOnStakeBox>
            <InputOnStakeBox type="text" scale="md" placeholder="Quantity" disabled />
            <MaxButtomOnStakeBox disabled>Max</MaxButtomOnStakeBox>
          </WrappInputOnStakeBox>
          <StakeBoxDropDown
            tokensAccept={tokensAccept}
            tokenSelected={tokenSelected}
            setTokenSelected={setTokenSelected}
          />
          <ButtonStakeBox scale="md" disabled>
            Stake
          </ButtonStakeBox>
        </StakeBoxCard>
      ) : (
        <StakeBoxCard>
          <Text fontSize="14px">Estimate: {Number(estimateLuaQty).toFixed(3)} Lua</Text>
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
          <StakeBoxDropDown
            tokensAccept={tokensAccept}
            tokenSelected={tokenSelected}
            setTokenSelected={setTokenSelected}
          />
          {tokenSelected ? (
            <>
              {!isApproved ? (
                <ButtonStakeBox
                  scale="md"
                  onClick={handleApprove}
                  disabled={isLoading || !Number(inputValue) || !tokenSelected}
                >
                  {!isLoading && !isLoadingApproveStatus ? 'Approve' : <LoaderIcon />}
                </ButtonStakeBox>
              ) : (
                <ButtonStakeBox
                  scale="md"
                  onClick={onClickButtonStake}
                  disabled={isLoading || !Number(inputValue) || !tokenSelected}
                >
                  {!isLoading ? 'Stake' : <LoaderIcon />}
                </ButtonStakeBox>
              )}
            </>
          ) : (
            <ButtonStakeBox scale="md" disabled>
              Stake
            </ButtonStakeBox>
          )}
        </StakeBoxCard>
      )}
    </>
  )
}

export default StakeBox
