import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from 'common-uikitstrungdao'
import { CommunityTag, CoreTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImages?: string[]
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, isCommunityFarm, farmImages, tokenSymbol }) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Image
        src={`${process.env.PUBLIC_URL}/images/farms/${farmImages[0]?.toLowerCase()}.png`}
        alt={tokenSymbol}
        width={64}
        height={64}
      />
      <Image
        src={`${process.env.PUBLIC_URL}/images/farms/${farmImages[1]?.toLowerCase()}.png`}
        alt={tokenSymbol}
        width={64}
        height={64}
      />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">{/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}</Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
