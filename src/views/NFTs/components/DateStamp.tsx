import { format } from 'date-fns'
import { Flex, Text } from 'luastarter-uikits'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedNFTPool } from 'state/nfts'
import styled from 'styled-components'
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
        setDateValue(format(new Date(openAt * 1000), 'dd MMM, yyyy'))
        setTimeValue(`(${new Date(openAt * 1000).getUTCHours()}:${new Date(openAt * 1000).getUTCMinutes()} UTC)`)
      } else {
        setDateValue(format(new Date(closeAt * 1000), 'dd MMM, yyyy'))
        setTimeValue(
          `(${pad2(new Date(closeAt * 1000).getUTCHours())}:${pad2(new Date(closeAt * 1000).getUTCMinutes())} UTC)`,
        )
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
