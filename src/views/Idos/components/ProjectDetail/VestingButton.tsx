import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { Button } from 'luastarter-uikits'
import { TimePeriodType } from 'utils/getTimePeriods'
import { UserVestingInfoType, VestingInfo } from 'views/Idos/hooks/useVestingInfo'
import BigNumber from 'bignumber.js'
import useTimer from 'hooks/useTimer'
import { compareTwoTimestamp } from 'utils/formatTime'
import { fromUnixTime } from 'date-fns'

interface VestingButtonProps {
  onClick(): any
  disabled: boolean
  isLoading: boolean
  endIcon: ReactNode
  timeNextClaim: TimePeriodType
  userVestingInfo: UserVestingInfoType
  userClaimFirstPercent: boolean
  idoReceivedAmount: string
  claimSymbol: string
  estimatedAmount: string
  vestingData: VestingInfo
}

const VestingButton: React.FC<VestingButtonProps> = ({
  onClick,
  timeNextClaim,
  disabled,
  userClaimFirstPercent,
  userVestingInfo,
  idoReceivedAmount,
  claimSymbol,
  vestingData,
  estimatedAmount,
  ...props
}) => {
  const { claimAtsTime, claimedAmount } = userVestingInfo
  const currentTimestamp = useTimer()
  const { claimAt, claimPercentage } = vestingData
  const currentTimestampInSecond = useMemo(() => {
    return Math.floor(currentTimestamp / 1000)
  }, [currentTimestamp])

  const isCurrentTimeOutOfClaimTimeFrame = useMemo(() => {
    if (claimAtsTime) {
      const lastTimeFrame = claimAt[claimAt.length - 1]
      const result = compareTwoTimestamp(currentTimestamp, Number(lastTimeFrame))

      return result
    }

    return false
  }, [currentTimestamp, claimAtsTime, claimAt])
  // const currentClaimTimeframe = useMemo(() => {
  //   if (userClaimFirstPercent) {
  //     return null
  //   }
  // }, [userClaimFirstPercent])

  const isDisabledButton = useMemo(() => {
    if (estimatedAmount === '0') {
      return true
    }

    return false
  }, [estimatedAmount])
  if (!userClaimFirstPercent && isCurrentTimeOutOfClaimTimeFrame) {
    return (
      <Button mb="15px" mt="15px" width="100%" variant="primary" onClick={onClick} {...props}>
        Claim reward
      </Button>
    )
  }

  return (
    <Button mb="15px" mt="15px" width="100%" variant="primary" onClick={onClick} disabled={isDisabledButton} {...props}>
      Claim {estimatedAmount} {claimSymbol}
    </Button>
  )
}

export default VestingButton
