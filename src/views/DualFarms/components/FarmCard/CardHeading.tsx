import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from 'luastarter-uikits'
import { CommunityTag, CoreTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImages?: string[]
  tokenSymbol?: string
  farm?: any
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, isCommunityFarm, farmImages, tokenSymbol, farm }) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Wrapper justifyContent="left" alignItems="center" width="130px">
        <Image src={farm.icon} alt={tokenSymbol} width={64} height={64} />
        <Image src={farm.icon2} alt={tokenSymbol} width={64} height={64} />
      </Wrapper>
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">{/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}</Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
