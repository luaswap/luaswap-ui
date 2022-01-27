import { format } from 'date-fns'
import { Flex, Text } from 'luastarter-uikits'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { getUtcDateTimeString } from 'utils/formatTime'
import useNFTPoolStatus from '../hook/useNFTPoolStatus'

const DateStampWrapper = styled(Flex)`
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 500px) {
    align-items: center;
  }
`

const TextStatus = styled(Text)`
  text-transform: capitalize;
`

const DateStamp = ({ NFTPoolDetail }) => {
  const [poolStatus] = useNFTPoolStatus(NFTPoolDetail)
  const [dateValue, setDateValue] = useState(null)
  const [timeValue, setTimeValue] = useState(null)

  const pad2 = (number) => {
    return (number < 10 ? '0' : '') + number
  }

  const textShow = useMemo(() => {
    if (poolStatus === 'upcoming') {
      return 'Open'
    }
    if (poolStatus === 'opening') {
      return 'Close'
    }
    return 'Closed'
  }, [poolStatus])

  useEffect(() => {
    if (NFTPoolDetail) {
      const { untilOpen, untilClose, openAt, closeAt } = NFTPoolDetail
      if (poolStatus === 'upcoming') {
        setDateValue(getUtcDateTimeString(new Date(openAt), 'dd MMM, yyyy', false))
        setTimeValue(getUtcDateTimeString(new Date(openAt), 'HH:mm', true))
      } else {
        setDateValue(getUtcDateTimeString(new Date(closeAt), 'dd MMM, yyyy', false))
        setTimeValue(getUtcDateTimeString(new Date(closeAt), 'HH:mm', true))
      }
    }
  }, [NFTPoolDetail, poolStatus])
  return (
    <DateStampWrapper>
      <Text fontSize="20px" fontWeight="bold" color="#FFFFFF">
        {dateValue}
      </Text>
      <TextStatus fontSize="14px" fontWeight="bold" color="#8B8B8B">
        {textShow} {timeValue}
      </TextStatus>
    </DateStampWrapper>
  )
}

export default DateStamp
