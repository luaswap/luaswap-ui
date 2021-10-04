import React, { ReactNode } from 'react'
import { Button } from 'luastarter-uikits'

interface ClaimButtonProps {
  onClick(): any
  disabled: boolean
  isLoading: boolean
  endIcon: ReactNode
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ onClick, disabled, ...props }) => {
  return (
    <Button mb="15px" mt="15px" width="100%" variant="primary" onClick={onClick} disabled={disabled} {...props}>
      Claim your reward
    </Button>
  )
}

export default ClaimButton
