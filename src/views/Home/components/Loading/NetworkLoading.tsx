import React from 'react'
import styled from 'styled-components'
import { Skeleton, Flex, BaseLayout } from 'luastarter-uikits'

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;
`
const CardNetwork = styled.div`
  grid-column: span 6;
  width: 100%;
  padding-bottom: 20px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`
const FlexNetwork = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`
const FlexBox = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`
const NetworkLoading: React.FC = () => {
  return (
    <>
      <Skeleton width="150px" height="20px" mb="18px" mt="50px" />
      <Cards>
        <CardNetwork>
          <FlexNetwork>
            <Skeleton width="30px" height="30px" variant="circle" mr="20px" />
            <Skeleton width="100%" />
          </FlexNetwork>
          <FlexBox>
            <Flex justifyContent="space-between" alignItems="center" pt="10px" pb="10px">
              <Skeleton width="70px" height="20px" mr="20px" />
              <Skeleton width="100%" height="10px" />
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" pt="10px" pb="10px">
              <Skeleton width="70px" height="20px" mr="20px" />
              <Skeleton width="100%" height="10px" />
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" pt="10px" pb="10px">
              <Skeleton width="70px" height="20px" mr="20px" />
              <Skeleton width="100%" height="10px" />
            </Flex>
          </FlexBox>
        </CardNetwork>
        <CardNetwork>
          <FlexNetwork>
            <Skeleton width="30px" height="30px" variant="circle" mr="20px" />
            <Skeleton width="100%" />
          </FlexNetwork>
          <FlexBox>
            <Flex justifyContent="space-between" alignItems="center" pt="10px" pb="10px">
              <Skeleton width="70px" height="20px" mr="20px" />
              <Skeleton width="100%" height="10px" />
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" pt="10px" pb="10px">
              <Skeleton width="70px" height="20px" mr="20px" />
              <Skeleton width="100%" height="10px" />
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" pt="10px" pb="10px">
              <Skeleton width="70px" height="20px" mr="20px" />
              <Skeleton width="100%" height="10px" />
            </Flex>
          </FlexBox>
        </CardNetwork>
      </Cards>
    </>
  )
}

export default NetworkLoading
