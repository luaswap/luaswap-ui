import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { Button } from 'luastarter-uikits'
import { TimePeriodType } from 'utils/getTimePeriods'
import { UserVestingInfoType, VestingInfo } from 'views/Idos/hooks/useVestingInfo'
import useTimer from 'hooks/useTimer'
import { compareTwoTimestamp } from 'utils/formatTime'

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
  isClaimedAllVesting: boolean
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
  isClaimedAllVesting,
  ...props
}) => {
  const { claimAtsTime, claimedAmount } = userVestingInfo
  const currentTimestamp = useTimer()
  const { claimAt, claimPercentage } = vestingData

  const isCurrentTimeOutOfClaimTimeFrame = useMemo(() => {
    if (claimAtsTime) {
      const lastTimeFrame = claimAt[claimAt.length - 1]
      const result = compareTwoTimestamp(currentTimestamp, Number(lastTimeFrame))

      return result
    }

    return false
  }, [currentTimestamp, claimAtsTime, claimAt])

  const isDisabledButton = useMemo(() => {
    if (estimatedAmount === '0') {
      return true
    }

    return false
  }, [estimatedAmount])
  // User not claim anything and current time is out of time frame
  if (!userClaimFirstPercent && isCurrentTimeOutOfClaimTimeFrame) {
    return (
      <Button mb="15px" mt="15px" width="100%" variant="primary" onClick={onClick} {...props}>
        Claim reward
      </Button>
    )
  }
  return (
    <Button mb="15px" mt="15px" width="100%" variant="primary" onClick={onClick} disabled={isDisabledButton} {...props}>
      {isDisabledButton
        ? `${timeNextClaim.hours} hour(s) ${timeNextClaim.minutes} minute(s) ${timeNextClaim.seconds} second(s)`
        : `Claim ${estimatedAmount} ${claimSymbol}`}
    </Button>
  )
}

export default VestingButton
