import React from 'react'
import { Button } from 'common-uikitstrungdao'

interface CommitButtonProps {
  onClick(): any
}

const CommitButton: React.FC<CommitButtonProps> = ({ onClick, ...props }) => {
  return (
    <Button mb="15px" variant="primary" onClick={onClick} {...props}>
      Commit your USDT
    </Button>
  )
}

export default CommitButton
