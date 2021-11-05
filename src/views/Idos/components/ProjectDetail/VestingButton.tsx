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
  estimateClaim: (time: number) => Promise<any>
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
  estimateClaim,
  ...props
}) => {
  const { claimAtsTime, claimedAmount } = userVestingInfo
  const [estimatedAmount, setEstimatedAmount] = useState(null)
  const currentTimestamp = useTimer()
  const { claimAt, claimPercentage } = vestingData
  const currentTimestampInSecond = useMemo(() => {
    return Math.floor(currentTimestamp / 1000)
  }, [currentTimestamp])
  useEffect(() => {
    const fetchEstimatedAmount = async () => {
      const res = await estimateClaim(currentTimestampInSecond)
      setEstimatedAmount(res)
    }

    fetchEstimatedAmount()
  }, [estimateClaim, currentTimestampInSecond])

  const isCurrentTimeOutOfClaimTimeFrame = useMemo(() => {
    if (claimAtsTime && claimAtsTime.length !== 0) {
      const lastTimeFrame = claimAtsTime[claimAtsTime.length - 1]
      const result = compareTwoTimestamp(currentTimestamp, Number(lastTimeFrame))

      return result
    }

    return false
  }, [currentTimestamp, claimAtsTime])

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

  if (!userClaimFirstPercent) {
    return (
      <Button mb="15px" mt="15px" width="100%" variant="primary" onClick={onClick} {...props}>
        Claim {new BigNumber(idoReceivedAmount).dividedBy(100).multipliedBy(claimedAmount[0]).toString()} {claimSymbol}
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
