import { Flex, Text } from 'luastarter-uikits'
import React from 'react'
import styled from 'styled-components'

const DateStampWrapper = styled(Flex)`
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
`

const DateStamp = () => {
  return (
    <DateStampWrapper>
      <Text fontSize="20px" fontWeight="bold" color="#FFFFFF">
        02 Apr, 2022
      </Text>
      <Text fontSize="14px" fontWeight="bold" color="#8B8B8B">
        Close (08:00 UTC)
      </Text>
    </DateStampWrapper>
  )
}

export default DateStamp
