import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Flex, Text, Mesage } from 'common-uikitstrungdao'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import useDepositIdo from 'hooks/useDepositIdo'
import useClaimRewardIdo from 'hooks/useClaimRewardIdo'
import ModalInput from 'components/ModalInput'
import { IdoDetailInfo, Pool } from 'views/Idos/types'
import { selectUserTier } from 'state/profile'
import { getDecimalAmount } from 'utils/formatBalance'
import ActionButton from './ActionButton'
import usePoolStatus from '../../hooks/usePoolStatus'
import useDataFromIdoContract from '../../hooks/useDataFromIdoContract'
import { calculateSwapRate } from '../helper'
import CountDown from './CountDown'

const CardWrapper = styled(Card)`
  width: 100%;
  margin-top: 24px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 40%;
    margin-top: 0px;
  }
`
interface DepositProps {
  currentPoolData: Pool
  tierDataOfUser: IdoDetailInfo
}

const Deposit: React.FC<DepositProps> = ({ currentPoolData, tierDataOfUser }) => {
  const { account } = useWeb3React()
  const [value, setValue] = useState('0')
  const { toastSuccess, toastError } = useToast()
  const { onDeposit } = useDepositIdo(tierDataOfUser.addressIdoContract)
  const { onClaimReward } = useClaimRewardIdo(tierDataOfUser.addressIdoContract)
  const [idoDetailFromContract, totalUserCommittedFromContract] = useDataFromIdoContract(
    tierDataOfUser.addressIdoContract,
    tierDataOfUser.index,
  )
  const userTier = useSelector(selectUserTier)
  // Todo: we should change this code when deploy to test ENV
  const { maxAmountPay, totalCommittedAmount, payToken, minAmountPay, idoToken, totalAmountIDO, totalAmountPay } =
    tierDataOfUser
  const [poolStatus, openAtSeconds, closedAtSeconds, claimAtSeconds] = usePoolStatus(tierDataOfUser)
  const maxAmountAllowed = useMemo(() => {
    return new BigNumber(maxAmountPay).minus(new BigNumber(totalCommittedAmount)).toString()
  }, [maxAmountPay, totalCommittedAmount])

  const rate = useMemo(() => {
    return calculateSwapRate(totalAmountIDO, totalAmountPay)
  }, [totalAmountIDO, totalAmountPay])

  const handleSelectMax = useCallback(() => {
    setValue(maxAmountAllowed)
  }, [maxAmountAllowed])

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      setValue(e.currentTarget.value.replace(/,/g, '.'))
    }
  }, [])

  const onHandleCommit = useCallback(async () => {
    try {
      const commitedAmmount = getDecimalAmount(new BigNumber(value)).toString()
      await onDeposit(commitedAmmount)
      toastSuccess('Deposit Successfully')
    } catch (error) {
      toastError('Fail to deposit')
    }
  }, [onDeposit, value, toastError, toastSuccess])

  const onHandleClaim = useCallback(async () => {
    try {
      // TODO: In here we assume that user claim equal amount of token that they commited
      const claimableAmount = getDecimalAmount(new BigNumber(totalCommittedAmount)).toString()
      await onClaimReward(claimableAmount)
      toastSuccess('Claim reward Successfully')
    } catch (error) {
      toastError('Fail to claim reward')
    }
  }, [onClaimReward, toastError, toastSuccess, totalCommittedAmount])

  const isPoolInProgress = useMemo(() => {
    if (poolStatus === 'open' || poolStatus === 'not open') {
      return true
    }

    return false
  }, [poolStatus])

  const isClaimable = useMemo(() => {
    const comparedNum = new BigNumber(totalCommittedAmount).comparedTo(0)

    if (comparedNum === 1) {
      return true
    }

    return false
  }, [totalCommittedAmount])

  return (
    <Flex
      flexDirection="column"
      style={{
        width: '40%',
      }}
    >
      <CardWrapper
        style={{
          width: '100%',
        }}
        mb="24px"
      >
        <CardBody
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Flex justifyContent="center" alignItems="center" flexDirection="column">
            <CountDown
              openAtSeconds={openAtSeconds}
              closedAtSeconds={closedAtSeconds}
              poolStatus={poolStatus}
              claimAtSeconds={claimAtSeconds}
            />
          </Flex>
        </CardBody>
      </CardWrapper>
      <CardWrapper
        style={{
          width: '100%',
        }}
      >
        <CardBody>
          <Text bold fontSize="24px">
            JOIN IDO ON TOMOCHAIN
          </Text>
          <Flex justifyContent="space-between">
            <Text>Your Tier</Text>
            <Text bold>Tier {userTier} - MOON</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>Min commit</Text>
            <Text bold>
              {minAmountPay} {payToken.symbol}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>Max commit</Text>
            <Text bold>
              {maxAmountPay} {payToken.symbol}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>Price</Text>
            <Text bold>
              1 {payToken.symbol} / {rate} {idoToken.symbol}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" mb="15px">
            <Text>Your committed</Text>
            <Text bold>
              {totalUserCommittedFromContract} {payToken.symbol}
            </Text>
          </Flex>
          <Flex justifyContent="center" alignItems="center" flexDirection="column">
            {account && isPoolInProgress && (
              <ModalInput
                value={value}
                onSelectMax={handleSelectMax}
                onChange={handleChange}
                max={maxAmountAllowed}
                min={new BigNumber(minAmountPay).toString()}
                symbol={payToken.symbol}
                inputTitle="Deposit"
              />
            )}
            <ActionButton
              poolStatus={poolStatus}
              onCommit={onHandleCommit}
              onClaim={onHandleClaim}
              disabled={!isClaimable}
              symbol={payToken.symbol}
            />
            {/* <Mesage variant="danger" mb="16px">
              IDO is on TomoChain, switch network to continue
            </Mesage> */}
          </Flex>
        </CardBody>
      </CardWrapper>
    </Flex>
  )
}

export default Deposit
