import React from 'react'
import styled from 'styled-components'
import { Text, Card, CardBody, Button, Flex, Image } from 'common-uikitstrungdao'

const CardHeader = styled.div`
  width: 100%;
  padding-top: 24px;
`
const Pool: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <Flex justifyContent="center">
          <Image
            width={60}
            height={60}
            src="https://wallet.tomochain.com/public/imgs/tomoiconwhite.png"
            alt="TomoChain"
          />
          <Image
            width={60}
            height={60}
            src="https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png"
            alt="Ethereum"
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex justifyContent="space-between">
          <Text>LP Token</Text>
          <Text>0.879518706</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>TOMOE</Text>
          <Text>28.613</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>ETH</Text>
          <Text>0.035</Text>
        </Flex>
        <Button mt="8px" width="100%">
          Convert
        </Button>
      </CardBody>
    </Card>
  )
}

export default Pool
