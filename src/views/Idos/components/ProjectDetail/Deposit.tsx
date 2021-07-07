import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Flex, Text, Mesage } from 'common-uikitstrungdao'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import useDepositIdo from 'hooks/useDepositIdo'
import { useApproveIdo } from 'hooks/useApproveIdo'
import useDeepMemo from 'hooks/useDeepMemo'
import useClaimRewardIdo from 'hooks/useClaimRewardIdo'
import ModalInput from 'components/ModalInput'
import { IdoDetailInfo, Pool } from 'views/Idos/types'
import { IdoDetail } from 'state/types'
import { selectUserTier } from 'state/profile'
import { getERC20Contract } from 'utils/contractHelpers'
import { getDecimalAmount } from 'utils/formatBalance'
import ActionButton from './ActionButton'
import usePoolStatus from '../../hooks/usePoolStatus'
import useIsApproved from '../../hooks/useIsApproved'
import { calculateSwapRate, getTierName } from '../helper'
import CountDown from './CountDown'

const CardWrapper = styled(Card)`
  width: 100%;
  margin-top: 24px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 40%;
    margin-top: 0px;
  }
`
const FlexWrapper = styled(Flex)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 40%;
  }
`

interface DepositProps {
  currentPoolData: Pool
  tierDataOfUser: IdoDetailInfo
  contractData: IdoDetail
  userTotalCommitted: string
  isAvailalbeOnCurrentNetwork: boolean
}

const Deposit: React.FC<DepositProps> = ({
  currentPoolData,
  tierDataOfUser,
  userTotalCommitted,
  isAvailalbeOnCurrentNetwork,
}) => {
  const [value, setValue] = useState('0')
  const [isRequestApproval, setIsRequestApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { account, library, chainId: cid } = useWeb3React()
  const paytokenContract = getERC20Contract(library, tierDataOfUser.payToken.address, cid)
  const [isApproved, fetchAllowanceData] = useIsApproved(paytokenContract, tierDataOfUser.addressIdoContract)
  const { onApprove } = useApproveIdo(paytokenContract, tierDataOfUser.addressIdoContract)
  const { onDeposit } = useDepositIdo(tierDataOfUser.addressIdoContract, tierDataOfUser.index)
  const { onClaimReward } = useClaimRewardIdo(tierDataOfUser.addressIdoContract, tierDataOfUser.index)
  const userTier = useSelector(selectUserTier)
  // Todo: we should change this code when deploy to test ENV
  const { maxAmountPay, totalCommittedAmount, payToken, minAmountPay, idoToken, totalAmountIDO, totalAmountPay } =
    tierDataOfUser
  const [poolStatus, openAtSeconds, closedAtSeconds, claimAtSeconds] = usePoolStatus(currentPoolData)
  const maxAmountAllowed = useMemo(() => {
    return new BigNumber(maxAmountPay).minus(new BigNumber(totalCommittedAmount)).toString()
  }, [maxAmountPay, totalCommittedAmount])

  const rate = useMemo(() => {
    return calculateSwapRate(totalAmountIDO, totalAmountPay)
  }, [totalAmountIDO, totalAmountPay])

  const isIdoAvailalbeOnChain = useDeepMemo(() => {
    const { addressIdoContract, chainId } = tierDataOfUser

    return !!addressIdoContract
  }, [tierDataOfUser])

  const handleSelectMax = useCallback(() => {
    setValue(maxAmountAllowed)
  }, [maxAmountAllowed])

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      setValue(e.currentTarget.value.replace(/,/g, '.'))
    }
  }, [])

  const handleApprove = useCallback(async () => {
    try {
      setIsRequestApproval(true)
      await onApprove()
      fetchAllowanceData()
      setIsRequestApproval(false)
    } catch (e) {
      setIsRequestApproval(false)
      console.error(e)
    }
  }, [onApprove, fetchAllowanceData])

  const onHandleCommit = useCallback(async () => {
    try {
      const commitedAmmount = getDecimalAmount(new BigNumber(value), payToken.decimals).toString()
      await onDeposit(commitedAmmount)
      toastSuccess('Deposit Successfully')
    } catch (error) {
      toastError('Fail to deposit')
    }
  }, [onDeposit, value, toastError, toastSuccess, payToken.decimals])

  const onHandleClaim = useCallback(async () => {
    try {
      // TODO: In here we assume that user claim equal amount of token that they commited
      const claimableAmount = getDecimalAmount(new BigNumber(totalCommittedAmount, payToken.decimals)).toString()
      await onClaimReward(claimableAmount)
      toastSuccess('Claim reward Successfully')
    } catch (error) {
      toastError('Fail to claim reward')
    }
  }, [onClaimReward, toastError, toastSuccess, totalCommittedAmount, payToken.decimals])

  const isPoolInProgress = useMemo(() => {
    if (poolStatus === 'open') {
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
    <FlexWrapper flexDirection="column">
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
          flex: 1,
        }}
      >
        <CardBody>
          {isAvailalbeOnCurrentNetwork ? (
            <>
              <Flex justifyContent="space-between">
                <Text>Your Tier</Text>
                <Text bold>
                  Tier {userTier} - {getTierName(userTier)}
                </Text>
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
              <Flex justifyContent="space-between">
                <Text>Your committed</Text>
                <Text bold>
                  {userTotalCommitted} {payToken.symbol}
                </Text>
              </Flex>
              {poolStatus === 'claim' ||
                (poolStatus === 'closed' && (
                  <Flex justifyContent="space-between" mb="15px">
                    <Text>You will receive</Text>
                    <Text bold>1 {idoToken.symbol}</Text>
                  </Flex>
                ))}
              {isIdoAvailalbeOnChain && (
                <Flex justifyContent="center" alignItems="center" flexDirection="column">
                  {account && isPoolInProgress && isApproved && (
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
                </Flex>
              )}
              <ActionButton
                isRequestApproval={isRequestApproval}
                handleApprove={handleApprove}
                isApproved={isApproved}
                poolStatus={poolStatus}
                onCommit={onHandleCommit}
                isIdoAvailalbeOnChain={isIdoAvailalbeOnChain}
                onClaim={onHandleClaim}
                disabled={!isClaimable}
                symbol={payToken.symbol}
                paytokenAddress={payToken.address}
              />
            </>
          ) : (
            <Mesage variant="warning">Switch to correct network to see pool&apos;s information</Mesage>
          )}
        </CardBody>
      </CardWrapper>
    </FlexWrapper>
  )
}

export default Deposit
