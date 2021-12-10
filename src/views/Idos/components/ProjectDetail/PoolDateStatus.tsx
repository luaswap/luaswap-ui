import { format } from 'date-fns'
import { Flex, Text } from 'luastarter-uikits'
import React, { useEffect, useState } from 'react'
import { Pool } from 'views/Idos/types'
import styled from 'styled-components'

const DateStatusWrapper = styled(Flex)`
  padding-left: 12px;
  margin-left: 12px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 90%;
    background-color: #606060;
    top: 5%;
    left: 0;
  }
`

interface PoolDateStatusProps {
  currentPoolData: Pool
}

const PoolDateStatus: React.FC<PoolDateStatusProps> = ({ currentPoolData }) => {
  const { untilOpen, untilClose, untilClaim, openAt, closeAt, claimAt } = currentPoolData
  const [dateStamp, setDateStamp] = useState(null)
  const [dateValue, setDateValue] = useState(null)

  useEffect(() => {
    if (untilOpen) {
      setDateStamp('Start date: ')
      setDateValue(format(new Date(openAt * 1000), 'MM/dd/yyyy'))
    } else if (untilClose) {
      setDateStamp('End date: ')
      setDateValue(format(new Date(closeAt * 1000), 'MM/dd/yyyy'))
    } else if (untilClaim) {
      setDateStamp('Claiming date: ')
      setDateValue(format(new Date(claimAt * 1000), 'MM/dd/yyyy'))
    }
  }, [untilOpen, untilClose, untilClaim, openAt, closeAt, claimAt])

  return (
    <>
      {dateStamp && (
        <DateStatusWrapper>
          <Text mr="5px" color="#8B8B8B">
            {dateStamp}
          </Text>
          <Text color="#C3C3C3">{dateValue}</Text>
        </DateStatusWrapper>
      )}
    </>
  )
}

export default PoolDateStatus
