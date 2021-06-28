import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectUserTier } from 'state/profile'

import {
  Card,
  CardBody,
  CardRibbon,
  Text,
  Link,
  Flex,
  TwitterIcon,
  MediumIcon,
  WorldIcon,
  TelegramIcon,
  Progress,
  Image,
} from 'common-uikitstrungdao'
import { selectOpenPools, selectPool } from 'state/ido'
import { useMemo } from 'react'

const ImageContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: #e9e9e9;
  overflow: hidden;
  margin-right: 10px;
`

const TierCard = styled(Card)`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    width: calc(33.33% - 16px);
  }
`

const TierDetails: React.FC<{
  index: string
}> = ({index}) => {
  // const [tiers, setIndex] = useState([0, 1, 2])

  const userTier = useSelector(selectUserTier)
  const pool = useSelector(selectPool(index))
  
  const Tier = (data) => (
    <TierCard>
      <CardBody style={{ height: '400px' }}>
        <Flex mb="15px" alignItems="center">
          <ImageContainer>
            <Image src="https://luaswap.org/static/media/logo.d77b343b.png" alt="img" width={60} height={60} />
          </ImageContainer>
          <Text
            fontSize="24px"
            bold
          >
            Tier 1
          </Text>
        </Flex>
        <Text>For every user, who holds less than 100 LUA and 100 TOMO</Text>
        <Flex justifyContent="flex-start" flexDirection="column">
          <Text color="primary">Swap rate</Text>
          <Text>1 BUSD = 10 BBANK</Text> 
        </Flex>
        <Flex justifyContent="flex-start" flexDirection="column">
          <Text color="primary">Cap</Text>
          <Text>1000000</Text>
        </Flex>
        <Flex justifyContent="flex-end" flexDirection="column">
          <Text color="primary">Access</Text>
          <Text>Private</Text>
        </Flex>
      </CardBody>
    </TierCard>
  )

  return <Flex flexWrap="wrap" justifyContent="space-between">
    {tiers.map((e, i) => <Tier data={e} key={e} />)}
  </Flex>
}

export default TierDetails
