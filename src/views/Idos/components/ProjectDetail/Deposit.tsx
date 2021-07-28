import React, { useMemo, useState, useCallback, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Flex, Text, Mesage, Box } from 'common-uikitstrungdao'
import { useWeb3React } from '@web3-react/core'
import axios, { AxiosResponse } from 'axios'
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
import { getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance'
import ActionButton from './ActionButton'
import usePoolStatus from '../../hooks/usePoolStatus'
import useIsApproved from '../../hooks/useIsApproved'
import { calculateSwapRate, getTierName } from '../helper'
import CountDown from './CountDown'

const CardWrapper = styled(Card)`
  width: 100%;
  margin-right: 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0px;
    margin-right: 24px;
    width: calc(65% - 24px);
  }
`
const BlockTimerWrapper = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0px;
    height: 100%;
    width: 35%;
    margin-top: 0px;
  }
`

const FlexWrapper = styled(Flex)`
  width: 100%;
  margin-top: 24px;
  @media screen and (min-width: 1250px) {
    width: 45%;
    margin-top: 0px;
  } ;
`

interface DepositProps {
  currentPoolData: Pool
  tierDataOfUser: IdoDetailInfo
  contractData: IdoDetail
  userTotalCommitted: string
  totalAmountUserSwapped: string
  isAvailalbeOnCurrentNetwork: boolean
}

const Deposit: React.FC<DepositProps> = ({
  currentPoolData,
  tierDataOfUser,
  userTotalCommitted,
  isAvailalbeOnCurrentNetwork,
  totalAmountUserSwapped,
}) => {
  const [value, setValue] = useState('0')
  const [idoReceivedAmount, setIdoReceivedAmount] = useState('0')
  const [isRequestContractAction, setIsRequestContractAction] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { account, library, chainId: cid } = useWeb3React()
  const paytokenContract = getERC20Contract(library, tierDataOfUser.payToken.address, cid)
  const [isApproved, fetchAllowanceData] = useIsApproved(paytokenContract, tierDataOfUser.addressIdoContract)
  const { onApprove } = useApproveIdo(paytokenContract, tierDataOfUser.addressIdoContract)
  const { onDeposit } = useDepositIdo(
    tierDataOfUser.addressIdoContract,
    tierDataOfUser.index,
    tierDataOfUser.payToken.address,
  )
  const { onClaimReward } = useClaimRewardIdo(tierDataOfUser.addressIdoContract, tierDataOfUser.index)
  const userTier = useSelector(selectUserTier)
  // Data we receive from API
  const { maxAmountPay, payToken, minAmountPay, idoToken, totalAmountIDO, totalAmountPay, index, projectId } =
    tierDataOfUser
  const [poolStatus, openAtSeconds, closedAtSeconds, claimAtSeconds] = usePoolStatus(currentPoolData)
  const maxAmountAllowedLeft = useMemo(() => {
    return new BigNumber(maxAmountPay).minus(new BigNumber(userTotalCommitted)).toString()
  }, [maxAmountPay, userTotalCommitted])

  const isUserDepositMinimumAmount = useMemo(() => {
    const flag = new BigNumber(userTotalCommitted).plus(new BigNumber(value)).comparedTo(new BigNumber(minAmountPay))
    if (flag < 0) {
      return false
    }

    return true
  }, [value, userTotalCommitted, minAmountPay])
  const rate = useMemo(() => {
    return calculateSwapRate(totalAmountIDO, totalAmountPay)
  }, [totalAmountIDO, totalAmountPay])

  const isIdoAvailalbeOnChain = useDeepMemo(() => {
    const { addressIdoContract } = tierDataOfUser

    return !!addressIdoContract
  }, [tierDataOfUser])

  const handleSelectMax = useCallback(() => {
    setValue(maxAmountAllowedLeft)
  }, [maxAmountAllowedLeft])

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      setValue(e.currentTarget.value.replace(/,/g, '.'))
    }
  }, [])

  const handleApprove = useCallback(async () => {
    try {
      setIsRequestContractAction(true)
      await onApprove()
      fetchAllowanceData()
      setIsRequestContractAction(false)
    } catch (e) {
      setIsRequestContractAction(false)
      console.error(e)
    }
  }, [onApprove, fetchAllowanceData])

  const getClaimProof = useCallback(
    async (poolId, poolIndex) => {
      const response = await axios.get(
        `https://api.luaswap.org/api/ido/pools/claim-info/${poolId}/${cid}/${poolIndex}/${userTier}/${account}`,
      )
      return response.data
    },
    [account, cid, userTier],
  )

  useEffect(() => {
    const fetchReceiveIdoAmount = async () => {
      try {
        const { finalPay } = await getClaimProof(projectId, index)
        const receivedIdoAmount = new BigNumber(finalPay).multipliedBy(totalAmountIDO).dividedBy(totalAmountPay)
        setIdoReceivedAmount(getFullDisplayBalance(receivedIdoAmount))
      } catch (error) {
        setIdoReceivedAmount('0')
        console.log(error)
      }
    }
    // We only fetch the IDO token that user can claimed when pool status is closed
    if (poolStatus === 'closed') {
      fetchReceiveIdoAmount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolStatus, getClaimProof, projectId, index])

  const getCommitProof = useCallback(
    async (poolId, poolIndex, amount) => {
      const response = await axios.get(
        `https://api.luaswap.org/api/ido/pools/proof-commit/${poolId}/${cid}/${poolIndex}/${userTier}/${account}/${amount}`,
      )
      return response.data
    },
    [account, cid, userTier],
  )

  const onHandleCommit = useCallback(async () => {
    try {
      setIsRequestContractAction(true)
      const commitedAmmount = getDecimalAmount(new BigNumber(value), payToken.decimals).toString()
      const response = await getCommitProof(projectId, index, commitedAmmount)
      const { s, v, r, deadline } = response.proof
      const proofS = [v, r, s, deadline]
      await onDeposit(commitedAmmount, proofS)
      toastSuccess('Deposit Successfully')
      setIsRequestContractAction(false)
    } catch (error) {
      setIsRequestContractAction(false)
      toastError('Fail to deposit')
    }
  }, [onDeposit, value, toastError, toastSuccess, payToken.decimals, getCommitProof, index, projectId])

  const onHandleClaim = useCallback(async () => {
    try {
      setIsRequestContractAction(true)
      const response = await getClaimProof(projectId, index)
      const { s, v, r, deadline } = response.proof
      const { finalPay } = response
      const proofS = [v, r, s, deadline]
      await onClaimReward(finalPay, proofS)
      setIsRequestContractAction(false)
      toastSuccess('Claim reward Successfully')
    } catch (error) {
      toastError('Fail to claim reward')
      setIsRequestContractAction(false)
    }
  }, [onClaimReward, toastError, toastSuccess, projectId, index, getClaimProof])

  const isPoolInProgress = useMemo(() => {
    if (poolStatus === 'open') {
      return true
    }

    return false
  }, [poolStatus])

  const isClaimable = useMemo(() => {
    const comparedNum = new BigNumber(userTotalCommitted).comparedTo(0)

    if (comparedNum === 1) {
      return true
    }

    return false
  }, [userTotalCommitted])

  const isClaimed = useMemo(() => {
    if (poolStatus === 'closed' && totalAmountUserSwapped !== '0' && userTotalCommitted === '0') {
      return true
    }

    return false
  }, [poolStatus, totalAmountUserSwapped, userTotalCommitted])

  return (
    <FlexWrapper flexDirection="row" flexWrap="wrap">
      <CardWrapper>
        <CardBody
          style={{
            height: '100%',
            ...(!isAvailalbeOnCurrentNetwork && {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }),
          }}
        >
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
                    <Text bold>
                      {idoReceivedAmount} {idoToken.symbol}
                    </Text>
                  </Flex>
                ))}
              {isIdoAvailalbeOnChain && (
                <Flex justifyContent="center" alignItems="center" flexDirection="column">
                  {account && isPoolInProgress && isApproved && (
                    <ModalInput
                      value={value}
                      onSelectMax={handleSelectMax}
                      onChange={handleChange}
                      max={maxAmountAllowedLeft}
                      min={new BigNumber(minAmountPay).toString()}
                      symbol={payToken.symbol}
                      inputTitle="Amount"
                      secondaryTitle="Available Balance"
                      showWarning={false}
                    />
                  )}
                </Flex>
              )}
              <ActionButton
                isRequestContractAction={isRequestContractAction}
                isUserDepositMinimumAmount={isUserDepositMinimumAmount}
                handleApprove={handleApprove}
                isApproved={isApproved}
                poolStatus={poolStatus}
                onCommit={onHandleCommit}
                isIdoAvailalbeOnChain={isIdoAvailalbeOnChain}
                onClaim={onHandleClaim}
                disabled={!isClaimable}
                symbol={payToken.symbol}
                isClaimed={isClaimed}
                paytokenAddress={payToken.address}
                maxAmountAllowedLeft={maxAmountAllowedLeft}
                depositAmount={value}
              />
              {isClaimed && <Mesage variant="warning">You have claimed your reward, check your wallet balance</Mesage>}
            </>
          ) : (
            <Flex alignItems="center" justifyContent="center" flexDirection="column">
              <img src={`${process.env.PUBLIC_URL}/images/empty.svg`} alt="empty" />
              <Text color="#606060" textAlign="center">
                Switch to correct network to see pool&apos;s information
              </Text>
            </Flex>
          )}
        </CardBody>
      </CardWrapper>
      <BlockTimerWrapper>
        <CountDown
          openAtSeconds={openAtSeconds}
          closedAtSeconds={closedAtSeconds}
          poolStatus={poolStatus}
          claimAtSeconds={claimAtSeconds}
        />
      </BlockTimerWrapper>
    </FlexWrapper>
  )
}

export default Deposit
