import React, { LegacyRef, ReactElement } from 'react'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import CommitButton from './CommitButton'
import ClaimButton from './ClaimButton'
import { PoolStatus } from '../../types'

interface ActionButtonProps {
  poolStatus: PoolStatus
  onCommit(): any
  onClaim(): any
  disabled: boolean
}

const ActionButton: React.FC<ActionButtonProps> = ({
  poolStatus,
  onClaim,
  onCommit,
  disabled,
}): ReactElement | null => {
  const { account } = useWeb3React()

  if (!account) {
    return <UnlockButton />
  }

  if (poolStatus === 'closed') {
    return <ClaimButton onClick={onClaim} disabled={disabled} />
  }

  if (poolStatus === 'open') {
    return <CommitButton onClick={onCommit} />
  }

  return null
}

export default ActionButton
