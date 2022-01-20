import { format } from 'date-fns'
import { Flex, Text } from 'luastarter-uikits'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedNFTPool } from 'state/nfts'
import styled from 'styled-components'
import usePoolStatus from 'views/Idos/hooks/usePoolStatus'

const DateStampWrapper = styled(Flex)`
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
`

const TextStatus = styled(Text)`
  text-transform: capitalize;
`

const DateStamp = ({ NFTPoolDetail }) => {
  const [poolStatus] = usePoolStatus(NFTPoolDetail)
  const [dateValue, setDateValue] = useState(null)

  useEffect(() => {
    if (NFTPoolDetail) {
      const { untilOpen, untilClose, openAt, closeAt } = NFTPoolDetail
      if (untilOpen) {
        setDateValue(format(new Date(openAt * 1000), 'dd MMM, yyyy'))
      } else if (untilClose) {
        setDateValue(format(new Date(closeAt * 1000), 'dd MMM, yyyy'))
      }
    }
  }, [NFTPoolDetail])
  return (
    <DateStampWrapper>
      <Text fontSize="20px" fontWeight="bold" color="#FFFFFF">
        {/* 02 Apr, 2022 */}
        {dateValue}
      </Text>
      <TextStatus fontSize="14px" fontWeight="bold" color="#8B8B8B">
        {poolStatus} (08:00 UTC)
      </TextStatus>
    </DateStampWrapper>
  )
}

export default DateStamp
