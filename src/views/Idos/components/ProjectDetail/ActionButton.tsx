import React, { LegacyRef, ReactElement, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Button, AutoRenewIcon } from 'luastarter-uikits'
import useToast from 'hooks/useToast'
import UnlockButton from 'components/UnlockButton'
import { ZERO_ADDRESS } from 'config/constants/idos'
import { UserVestingInfoType, VestingInfo } from 'views/Idos/hooks/useVestingInfo'
import { compareTwoTimestamp } from 'utils/formatTime'
import { TimePeriodType } from 'utils/getTimePeriods'
import CommitButton from './CommitButton'
import ClaimButton from './ClaimButton'
import VestingButton from './VestingButton'
import { PoolStatus } from '../../types'

interface ActionButtonProps {
  poolStatus: PoolStatus
  isLoadingApproveStatus: boolean
  onCommit(): any
  onClaim(): any
  onClaimVesting(): any
  disabled: boolean
  symbol: string
  isRequestContractAction: boolean
  isIdoAvailalbeOnChain: boolean
  isUserDepositMinimumAmount: boolean
  handleApprove(): any
  isApproved: boolean
  paytokenAddress: string
  maxAmountAllowedLeft: string
  depositAmount: string
  isClaimed: boolean
  minAmount: number
  payTokenBalance: BigNumber
  userTotalCommitted: string
  isShowVesting: boolean
  timeNextClaim: TimePeriodType
  idoReceivedAmount: string
  claimSymbol: string
  vestingData: VestingInfo
  estimatedAmount: string
  isLoadingVestingInfo: boolean
  isClaimedAllVesting: boolean
  timeVesting: string[]
  percentVesting: string[]
}

const ActionButton: React.FC<ActionButtonProps> = ({
  poolStatus,
  onClaim,
  onCommit,
  symbol,
  disabled,
  isApproved,
  handleApprove,
  isRequestContractAction,
  isUserDepositMinimumAmount,
  paytokenAddress,
  isIdoAvailalbeOnChain,
  maxAmountAllowedLeft,
  depositAmount,
  isClaimed,
  isLoadingApproveStatus,
  minAmount,
  payTokenBalance,
  userTotalCommitted,
  isShowVesting,
  onClaimVesting,
  idoReceivedAmount,
  timeNextClaim,
  claimSymbol,
  vestingData,
  estimatedAmount,
  isLoadingVestingInfo,
  isClaimedAllVesting,
  timeVesting,
  percentVesting,
}): ReactElement | null => {
  const { account } = useWeb3React()
  const { toastError } = useToast()
  const isNativeToken = paytokenAddress === ZERO_ADDRESS
  const { userVestingInfo } = vestingData
  const { claimAtsTime } = userVestingInfo
  const userClaimFirstPercent = useMemo(() => {
    return claimAtsTime !== '0'
  }, [claimAtsTime])

  if (!account) {
    return <UnlockButton />
  }

  if ((!isIdoAvailalbeOnChain || isClaimed || isLoadingApproveStatus) && !isShowVesting) {
    return null
  }

  if (!isApproved && !isNativeToken && poolStatus !== 'closed') {
    return (
      <Button
        mt="8px"
        width="100%"
        onClick={handleApprove}
        isLoading={isRequestContractAction}
        endIcon={isRequestContractAction && <AutoRenewIcon spin color="currentColor" />}
      >
        Approve Contract{' '}
      </Button>
    )
  }
  if (poolStatus === 'closed') {
    if (isShowVesting) {
      if (isLoadingVestingInfo || isClaimedAllVesting) {
        return null
      }
      return (
        <VestingButton
          vestingData={vestingData}
          userVestingInfo={userVestingInfo}
          timeVesting={timeVesting}
          percentVesting={percentVesting}
          estimatedAmount={estimatedAmount}
          timeNextClaim={timeNextClaim}
          userClaimFirstPercent={userClaimFirstPercent}
          claimSymbol={claimSymbol}
          idoReceivedAmount={idoReceivedAmount}
          isClaimedAllVesting={isClaimedAllVesting}
          onClick={() => {
            // If user already claim 1 time we will call other functi
            if (!userClaimFirstPercent) {
              onClaim()
            } else {
              onClaimVesting()
            }
          }}
          disabled={userClaimFirstPercent}
          isLoading={isRequestContractAction}
          endIcon={isRequestContractAction && <AutoRenewIcon spin color="currentColor" />}
        />
      )
    }

    return (
      <ClaimButton
        onClick={onClaim}
        disabled={disabled}
        isLoading={isRequestContractAction}
        endIcon={isRequestContractAction && <AutoRenewIcon spin color="currentColor" />}
      />
    )
  }

  if (poolStatus === 'open') {
    const isMaxAmountEqualZero = maxAmountAllowedLeft === '0'
    let isDepositAmountTooLarge = false
    let isDepositAmountTooSmall = false
    let isDepositAmountLargerThanBalance = false
    const isDepositAmountInvalid = !depositAmount || depositAmount === '0'

    if (new BigNumber(depositAmount).comparedTo(maxAmountAllowedLeft) > 0) {
      isDepositAmountTooLarge = true
    }

    if (new BigNumber(depositAmount).plus(new BigNumber(userTotalCommitted)).comparedTo(minAmount) < 0) {
      isDepositAmountTooSmall = true
    }

    if (payTokenBalance.isZero() || new BigNumber(depositAmount).comparedTo(payTokenBalance) > 0) {
      isDepositAmountLargerThanBalance = true
    }
    return (
      <CommitButton
        onClick={() => {
          if (isDepositAmountLargerThanBalance) {
            toastError('Committed amount is larger than your balance')
            return
          }
          onCommit()
        }}
        symbol={symbol}
        isLoading={isRequestContractAction}
        endIcon={isRequestContractAction && <AutoRenewIcon spin color="currentColor" />}
        disabled={
          isMaxAmountEqualZero ||
          isDepositAmountTooLarge ||
          isDepositAmountInvalid ||
          !isUserDepositMinimumAmount ||
          isDepositAmountTooSmall
        }
      />
    )
  }

  return null
}

export default ActionButton
