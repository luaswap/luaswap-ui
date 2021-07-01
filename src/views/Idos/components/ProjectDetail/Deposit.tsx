import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Flex, Text } from 'common-uikitstrungdao'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import { IdoDetail } from 'state/types'
import useDepositIdo from 'hooks/useDepositIdo'
import useClaimRewardIdo from 'hooks/useClaimRewardIdo'
import ModalInput from 'components/ModalInput'
import { Pool } from 'views/Idos/types'
import { getDecimalAmount } from 'utils/formatBalance'
import { getUtcDateString } from 'utils/formatTime'
import ActionButton from './ActionButton'
import usePoolStatus from '../../hooks/usePoolStatus'
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
  idoDetail: IdoDetail | null
  totalCommited: string
  currentPoolData: Pool
}

const Deposit: React.FC<DepositProps> = ({ idoDetail, totalCommited, currentPoolData }) => {
  const { account } = useWeb3React()
  const [value, setValue] = useState('0')
  const { toastSuccess, toastError } = useToast()
  const { onDeposit } = useDepositIdo()
  const { onClaimReward } = useClaimRewardIdo()
  const { maxAmountPay, claimAt, totalCommittedAmount } = idoDetail
  const [poolStatus, openAtSeconds, closedAtSeconds, claimAtSeconds] = usePoolStatus(idoDetail)
  const { index } = currentPoolData
  // Todo: we should change this code when deploy to test ENV
  const { payToken } = index['89'][0]
  const maxAmountAllowed = useMemo(() => {
    return new BigNumber(maxAmountPay).minus(new BigNumber(totalCommited)).toString()
  }, [maxAmountPay, totalCommited])

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
      const claimableAmount = getDecimalAmount(new BigNumber(totalCommited)).toString()
      await onClaimReward(claimableAmount)
      toastSuccess('Claim reward Successfully')
    } catch (error) {
      toastError('Fail to claim reward')
    }
  }, [onClaimReward, toastError, toastSuccess, totalCommited])

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
    <CardWrapper>
      <CardBody
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '350px',
        }}
      >
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
          <CountDown
            openAtSeconds={openAtSeconds}
            closedAtSeconds={closedAtSeconds}
            poolStatus={poolStatus}
            claimAtSeconds={claimAtSeconds}
          />
          <ActionButton
            poolStatus={poolStatus}
            onCommit={onHandleCommit}
            onClaim={onHandleClaim}
            disabled={!isClaimable}
            symbol={payToken.symbol}
          />
          {account && isPoolInProgress && (
            <ModalInput
              value={value}
              onSelectMax={handleSelectMax}
              onChange={handleChange}
              max={maxAmountAllowed}
              symbol={payToken.symbol}
              inputTitle="Deposit"
            />
          )}
          <Text textAlign="center" mt="10px">
            Deposit USDT to commit the slots, Unspent USDT can be withdrawn when IDO finishes. Token can be claimed
            after {getUtcDateString(claimAt)}
          </Text>
        </Flex>
      </CardBody>
    </CardWrapper>
  )
}

export default Deposit
