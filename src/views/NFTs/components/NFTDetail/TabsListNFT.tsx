import { useWeb3React } from '@web3-react/core'
import { Flex, Progress, Text } from 'luastarter-uikits'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedNFTPool } from 'state/nfts'
import styled from 'styled-components'

interface TabItemProps {
  isActive?: boolean
  isHovered?: boolean
}

const Wrapper = styled.div`
  background: #282828;
`

const TabsList = styled.div``

const TabItem = styled.div<TabItemProps>`
  padding: 24px 44px 24px 32px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ isActive }) => (isActive ? '#353535' : 'unset')};
  position: relative;

  &:hover {
    background: #353535;
  }

  &::before {
    display: ${({ isActive, isHovered }) => (isActive || isHovered ? 'block' : 'none')};
    width: 20px;
    height: 20px;
    z-index: 9999;
    border-bottom-right-radius: 40px;
    background-color: transparent;
    box-shadow: 8px 8px 2px 6px #353535;
    top: -20px;
    right: 0px;
    position: absolute;
    content: '';
  }
  &::after {
    display: ${({ isActive, isHovered }) => (isActive || isHovered ? 'block' : 'none')};
    width: 20px;
    height: 20px;
    z-index: 9999;
    border-top-right-radius: 40px;
    background-color: transparent;
    box-shadow: 8px -8px 2px 6px #353535;
    bottom: -20px;
    right: 0px;
    position: absolute;
    content: '';
  }
`

const TabName = styled.div``

const TabPrice = styled(Text)``

const ProgressBlock = styled.div`
  padding: 24px 44px 24px 32px;
`

const ProgressTextBlock = styled(Flex)``

const TabsListNFT = ({ activeIndex, setActiveIndex }) => {
  const [hoverIndex, setHoverIndex] = useState(-1)
  const NFTPoolDetail = useSelector(selectSelectedNFTPool)
  const { chainId } = useWeb3React()

  const totalSale = useMemo(() => {
    let total = 0
    NFTPoolDetail?.index['56'].forEach((item) => {
      total += item.totalSale
    })
    return total
  }, [NFTPoolDetail, chainId])

  return (
    <Wrapper>
      <TabsList>
        {NFTPoolDetail?.index['56'].map((item, index) => (
          <TabItem
            key={item.id}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            isHovered={hoverIndex === index}
            onMouseEnter={() => {
              setHoverIndex(index)
            }}
            onMouseLeave={() => {
              setHoverIndex(-1)
            }}
          >
            <TabName>
              <Text fontWeight="bold" fontSize="20px" color="#FFFFFF">
                {item.name}
              </Text>
              <Text fontWeight="normal" fontSize="14px" color="#FFFFFF">
                {item.totalSale} available
              </Text>
            </TabName>
            <TabPrice fontWeight="900" fontSize="15px" color="#FFFFFF">
              {item.price} BUSD
            </TabPrice>
          </TabItem>
        ))}
      </TabsList>
      <ProgressBlock>
        <ProgressTextBlock justifyContent="space-between" alignItems="center">
          <Text fontWeight="normal" fontSize="15px" color="#FFFFFF">
            4,000/{totalSale} Available{' '}
          </Text>
          <Text fontWeight="normal" fontSize="15px" color="#FFFFFF">
            10% sold
          </Text>
        </ProgressTextBlock>
        <Progress variant="round" scale="md" primaryStep={10} colorBackground="#353535" colorBar="#C3C3C3" />
      </ProgressBlock>
    </Wrapper>
  )
}

export default TabsListNFT
