import React, { ReactNode } from 'react'
import { Button } from 'luastarter-uikits'

interface CommitButtonProps {
  onClick(): any
  symbol: string
  disabled: boolean
  isLoading: boolean
  endIcon: ReactNode
}

const CommitButton: React.FC<CommitButtonProps> = ({ onClick, symbol, disabled, ...props }) => {
  return (
    <Button mb="15px" mt="15px" width="100%" variant="primary" onClick={onClick} disabled={disabled} {...props}>
      Commit your {symbol}
    </Button>
  )
}

export default CommitButton
