import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Flex, Text } from 'common-uikitstrungdao'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import { IdoDetail } from 'state/types'
import useDepositIdo from 'hooks/useDepositIdo'
import ModalInput from 'components/ModalInput'
import { getDecimalAmount } from 'utils/formatBalance'
import { getUtcDateString } from 'utils/formatTime'
import ActionButton from './ActionButton'
import useSecondsUntilCurrent from '../../hooks/useSecondsUntilCurrent'
import { PoolStatus } from '../../types'
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
}

const Deposit: React.FC<DepositProps> = ({ idoDetail, totalCommited }) => {
  const { account } = useWeb3React()
  const [value, setValue] = useState('0')
  const { toastSuccess, toastError } = useToast()
  const { onDeposit } = useDepositIdo()
  const { maxAmountPay, claimAt, openAt, closeAt } = idoDetail
  const maxAmountAllowed = useMemo(() => {
    return new BigNumber(maxAmountPay).minus(new BigNumber(totalCommited)).toString()
  }, [maxAmountPay, totalCommited])

  const openAtSeconds = useSecondsUntilCurrent(openAt)
  const closedAtSeconds = useSecondsUntilCurrent(closeAt)
  const claimAtSeconds = useSecondsUntilCurrent(claimAt)
  /* Variable to check if pool is open or not based on openAt and closeAt timestamp received from smart contract */
  const poolStatus: PoolStatus = useMemo(() => {
    /* If open time > 0 and closed time > 0 -> the Pool is not open yet */
    if (openAtSeconds > 0 && closedAtSeconds > 0) {
      return 'not open'
    }
    if (openAtSeconds <= 0 && closedAtSeconds > 0) {
      return 'open'
    }
    if (openAtSeconds <= 0 && closedAtSeconds <= 0 && claimAtSeconds > 0) {
      return 'claim'
    }
    return 'closed'
  }, [openAtSeconds, closedAtSeconds, claimAtSeconds])

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

  const onHandleClaim = useCallback(() => {
    console.log('claming')
  }, [])

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
          <ActionButton poolStatus={poolStatus} onCommit={onHandleCommit} onClaim={onHandleClaim} />
          {account && (
            <ModalInput
              value={value}
              onSelectMax={handleSelectMax}
              onChange={handleChange}
              max={maxAmountAllowed}
              symbol="USDT"
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
