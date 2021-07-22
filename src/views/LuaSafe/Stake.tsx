import React from 'react'
import styled from 'styled-components'
import { Text, Card, CardBody, Button, Flex } from 'common-uikitstrungdao'
import Value from '../../components/Value'

const CardHeader = styled.div`
  width: 100%;
`
const StakeLua: React.FC = () => {
  return (
    <Card p="40px">
      <CardHeader>
        <Text pb="30px" fontSize="24px">
          {' '}
          YOUR LUA{' '}
        </Text>
        <Value value={10} decimals={2} />
      </CardHeader>
      <CardBody>
        <Button mt="8px" width="100%">
          Stake
        </Button>
      </CardBody>
    </Card>
  )
}

export default StakeLua
