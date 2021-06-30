import React from 'react'
import { Button } from 'common-uikitstrungdao'

interface ClaimButtonProps {
  onClick(): any
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ onClick, ...props }) => {
  return (
    <Button mb="15px" variant="primary" onClick={onClick} {...props}>
      Claim your reward
    </Button>
  )
}

export default ClaimButton
