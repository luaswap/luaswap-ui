import React from 'react'
import { Card, CardBody, CardRibbon } from 'common-uikitstrungdao'

const PoolDetail = () => {
  return (
    <Card ribbon={<CardRibbon variantColor="success" text="Opening" />}>
      <CardBody style={{ height: '150px' }}>Card</CardBody>
    </Card>
  )
}

export default PoolDetail
