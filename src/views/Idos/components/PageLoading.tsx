import React from 'react'
import { Skeleton, Card, CardBody, Flex } from 'common-uikitstrungdao'

const PageLoading = () => {
  return (
    <Card
      style={{
        width: '475px',
      }}
    >
      <CardBody>
        <Flex>
          <Skeleton width="60px" height="60px" variant="circle" mr="15px" mb="15px" />
          <Flex flexDirection="column">
            <Skeleton width="100px" mb="10px" />
            <Flex>
              <Skeleton width="20px" height="20px" variant="circle" mb="15px" mr="5px" />
              <Skeleton width="20px" height="20px" variant="circle" mb="15px" mr="5px" />
              <Skeleton width="20px" height="20px" variant="circle" mb="15px" mr="5px" />
              <Skeleton width="20px" height="20px" variant="circle" mb="15px" mr="5px" />
            </Flex>
          </Flex>
        </Flex>
        <Skeleton width="430px" />
        <Flex justifyContent="space-between" mt="20px">
          <Flex flexDirection="column">
            <Skeleton width="50px" mb="5px" />
            <Skeleton width="50px" mb="5px" />
          </Flex>
          <Flex flexDirection="column">
            <Skeleton width="50px" mb="5px" />
            <Skeleton width="50px" mb="5px" />
          </Flex>
        </Flex>
        <Skeleton width="430px" mt="10px" />
      </CardBody>
    </Card>
  )
}

export default PageLoading
