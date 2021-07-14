import React, { LegacyRef, ReactElement } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Button, AutoRenewIcon } from 'common-uikitstrungdao'
import UnlockButton from 'components/UnlockButton'
import { ZERO_ADDRESS } from 'config/constants/idos'
import CommitButton from './CommitButton'
import ClaimButton from './ClaimButton'
import { PoolStatus } from '../../types'

interface ActionButtonProps {
  poolStatus: PoolStatus
  onCommit(): any
  onClaim(): any
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
}): ReactElement | null => {
  const { account } = useWeb3React()
  const isNativeToken = paytokenAddress === ZERO_ADDRESS
  if (!account) {
    return <UnlockButton />
  }

  if (!isIdoAvailalbeOnChain || isClaimed) {
    return null
  }

  if (!isApproved && !isNativeToken) {
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
    const isDepositAmountInvalid = !depositAmount || depositAmount === '0'

    if (new BigNumber(depositAmount).comparedTo(maxAmountAllowedLeft) > 0) {
      isDepositAmountTooLarge = true
    }
    return (
      <CommitButton
        onClick={onCommit}
        symbol={symbol}
        isLoading={isRequestContractAction}
        endIcon={isRequestContractAction && <AutoRenewIcon spin color="currentColor" />}
        disabled={
          isMaxAmountEqualZero || isDepositAmountTooLarge || isDepositAmountInvalid || !isUserDepositMinimumAmount
        }
      />
    )
  }

  return null
}

export default ActionButton
