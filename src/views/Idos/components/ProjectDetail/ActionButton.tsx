import React, { LegacyRef, ReactElement } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'common-uikitstrungdao'
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
  isRequestApproval: boolean
  handleApprove(): any
  isApproved: boolean
  paytokenAddress: string
}

const ActionButton: React.FC<ActionButtonProps> = ({
  poolStatus,
  onClaim,
  onCommit,
  symbol,
  disabled,
  isApproved,
  handleApprove,
  isRequestApproval,
  paytokenAddress,
}): ReactElement | null => {
  const { account } = useWeb3React()
  const isNativeToken = paytokenAddress === ZERO_ADDRESS

  if (!isApproved && !isNativeToken) {
    return (
      <Button mt="8px" width="100%" disabled={isRequestApproval} onClick={handleApprove}>
        Approve Contract{' '}
      </Button>
    )
  }

  if (!account) {
    return <UnlockButton />
  }

  if (poolStatus === 'closed') {
    return <ClaimButton onClick={onClaim} disabled={disabled} />
  }

  if (poolStatus === 'open') {
    return <CommitButton onClick={onCommit} symbol={symbol} />
  }

  return null
}

export default ActionButton
