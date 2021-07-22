import React from 'react'
import styled from 'styled-components'
import { Text, Card, CardBody, Button, Flex } from 'common-uikitstrungdao'
import Value from '../../components/Value'

const CardHeader = styled.div`
  width: 100%;
`
const CardInsight = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 0px solid #e6dcd5;
  border-radius: 8px;
  box-sizing: border-box;
  background: transparent;
  color: #9e9e9e;
  font-size: 13px;
  text-align: center;
  line-height: 25px;
`
const UnstakeXLua: React.FC = () => {
  return (
    <Card p="40px">
      <CardHeader>
        <Text pb="30px" fontSize="24px">
          {' '}
          YOUR xLUA{' '}
        </Text>
        <Value value={10} decimals={2} />
        <Text pt="5px"> ~ 10 LUA </Text>
      </CardHeader>
      <CardBody>
        <Button mt="8px" width="100%">
          Unstake
        </Button>
        <CardInsight mt="30px" mb="10px">
          <Text>APY</Text>
          <Text>10%</Text>
        </CardInsight>
        <CardInsight>
          <Text>Unstake fee</Text>
          <Text>0.5%</Text>
        </CardInsight>
      </CardBody>
    </Card>
  )
}

export default UnstakeXLua
