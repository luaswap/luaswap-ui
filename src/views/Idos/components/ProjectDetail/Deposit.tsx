import React from 'react'
import { Card, CardBody, Flex, Button, Text } from 'common-uikitstrungdao'

const Deposit = () => {
  return (
    <Card
      style={{
        width: '30%',
      }}
    >
      <CardBody
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '350px',
        }}
      >
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
          <Button scale="sm" mb="10px">
            Connect Wallet
          </Button>
          <Text textAlign="center">
            Deposit USDT to commit the slots, Unspent USDT can be withdrawn when IDO finishes. Token can be claimed
            after Fri, 25 Jun 2021 08.00.00 GMT
          </Text>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default Deposit
