import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Text, Flex, useModal, ChevronDownIcon } from 'common-uikitstrungdao'

import { useAppDispatch } from 'state'
import { WalletProps } from 'state/types'
import { setWalletActive } from 'state/blockfolio'
import useOnClickOutside from 'hooks/useClickOutside'
import AddressModal from './AddressModal'
import WalletIcon from './Icon/WalletIcon'
// import LinkIcon from './Icon/LinkIcon'
// import CalendarIcon from './Icon/CalendarIcon'
// import PencilIcon from './Icon/PencilIcon'

interface AddressManageProps {
  data: WalletProps
}
const Line = styled.hr`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  margin-top: 0;
  margin-bottom: 10px;
`
const StyleTextBox = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
`
const StyleWalletManage = styled.div`
  position: absolute;
  min-width: 300px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.cardBorder};
  padding: 20px;
  top: 100%;
  right: 0;
  border-radius: 15px;
`
const StyleBox = styled.div`
  padding-bottom: 10px;
`

const AddressBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`
const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  background-color: #fbf4bf;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  line-height: 30px;
  border-radius: 50px;
  font-size: 16px;
  margin-right: 10px;
`
const StyleAction = styled.div`
  display: flex;
  align-items: center;
  svg {
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    font-size: 30px;
    padding: 8px;
    margin-left: 10px;
    color: ${({ theme }) => theme.colors.text};
    :hover {
      background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    }
  }
`

const AddressManage: React.FC<AddressManageProps> = ({data}) => {
  const ref = useRef()
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const filterWalletActived = Object.values(data).filter((w) => {
    return w.isActive === true
  })
  const filterWalletConnected = Object.values(data).filter((w) => {
    return w.isConnected === true
  })
  const filterWalletWatched = Object.values(data).filter((w) => {
    return w.isConnected === false
  })

  const handleChangeWallet = (address) => {
    dispatch(setWalletActive(address))
    setIsOpen(false)
  }
  

  const [onPresentAddress] = useModal(<AddressModal />)
  useOnClickOutside(ref, () => setIsOpen(false))
  return (
    <Flex position="relative">
      <StyleTextBox onClick={() => setIsOpen(!isOpen)}>
        {filterWalletActived.length > 0 &&
          <Flex>
            <IconWrapper>
              <WalletIcon />
            </IconWrapper>
            <Text
              style={{ cursor: "pointer" }}>
              {`${filterWalletActived[0].address.substring(0, 8)}...${filterWalletActived[0].address.substring(filterWalletActived[0].address.length - 6, filterWalletActived[0].address.length)}`}
            </Text>
          </Flex>
        }
        <ChevronDownIcon />
      </StyleTextBox>
      {isOpen && (
        <StyleWalletManage ref={ref}>
          {filterWalletConnected.length > 0 &&
            <StyleBox>
            <Text pb="10px">Connected</Text>
            {filterWalletConnected.map((w) => 
              <AddressBox>
                <IconWrapper>
                  <WalletIcon />
                </IconWrapper>
                <Text
                  onClick={() => handleChangeWallet(w.address)}
                  style={{ cursor: 'pointer' }}>
                  {`${w.address.substring(0, 8)}...${w.address.substring(w.address.length - 6,w.address.length,)}`}
                </Text>
                <StyleAction>
                  {/* <PencilIcon /> */}
                  {/* <CalendarIcon /> */}
                  {/* <LinkIcon /> */}
                </StyleAction>
              </AddressBox>
              )}
            </StyleBox>
          }
          {filterWalletWatched.length > 0 && 
            <StyleBox>
            <Text pb="10px">Watched</Text>
            {filterWalletWatched.map((w) => 
              <AddressBox>
                <IconWrapper>
                  <WalletIcon />
                </IconWrapper>
                <Text
                  onClick={() => handleChangeWallet(w.address)}
                  style={{ cursor: 'pointer' }}>
                  {`${w.address.substring(0, 8)}...${w.address.substring(w.address.length - 6, w.address.length)}`}
                </Text>
                <StyleAction>
                  {/* <PencilIcon/> */}
                  {/* <CalendarIcon /> */}
                  {/* <LinkIcon /> */}
                </StyleAction>
              </AddressBox>
            )}
            </StyleBox>            
          }
          <Line />
          <StyleBox style={{ cursor: 'pointer' }} onClick={onPresentAddress}>
            <Text>Manage Addresses</Text>
          </StyleBox>
          {/* <StyleBox>
            <Text>Network Settings</Text>
          </StyleBox>           */}
        </StyleWalletManage>
      )}
    </Flex>
  )
}

export default AddressManage
