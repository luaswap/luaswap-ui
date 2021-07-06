import React from 'react'
import { Button } from 'common-uikitstrungdao'

interface CommitButtonProps {
  onClick(): any
  symbol: string
}

const CommitButton: React.FC<CommitButtonProps> = ({ onClick, symbol, ...props }) => {
  return (
    <Button mb="15px" mt="15px" width="100%" variant="primary" onClick={onClick} {...props}>
      Commit your {symbol}
    </Button>
  )
}

export default CommitButton
