import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Text, Flex, useModal, ChevronDownIcon } from 'luastarter-uikits'

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
const FlexAddress = styled(Flex)`
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.colors.cardBorder};
  }
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
  z-index: 1;
`
const StyleBox = styled.div`
  padding-bottom: 10px;
`

const AddressBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  :hover {
    text-decoration: underline;
  }
`
const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  background-color: #282828;
  color: #c3c3c3;
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

const AddressManage: React.FC<AddressManageProps> = ({ data }) => {
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
        {filterWalletActived.length > 0 ? (
          <FlexAddress>
            <IconWrapper>
              <WalletIcon />
            </IconWrapper>
            <Text>
              {`${filterWalletActived[0].address.substring(0, 8)}...${filterWalletActived[0].address.substring(
                filterWalletActived[0].address.length - 6,
                filterWalletActived[0].address.length,
              )}`}
            </Text>
            <ChevronDownIcon />
          </FlexAddress>
        ) : (
          <FlexAddress>
            <IconWrapper>
              <WalletIcon />
            </IconWrapper>
            <Text>Add Address</Text>
            <ChevronDownIcon />
          </FlexAddress>
        )}
      </StyleTextBox>
      {isOpen && (
        <StyleWalletManage ref={ref}>
          {filterWalletConnected.length > 0 && (
            <StyleBox>
              <Text pb="10px">Connected</Text>
              {filterWalletConnected.map((w) => (
                <AddressBox key={w.address}>
                  <IconWrapper>
                    <WalletIcon />
                  </IconWrapper>
                  <Text onClick={() => handleChangeWallet(w.address)} style={{ cursor: 'pointer' }}>
                    {`${w.address.substring(0, 8)}...${w.address.substring(w.address.length - 6, w.address.length)}`}
                  </Text>
                  <StyleAction>
                    {/* <PencilIcon /> */}
                    {/* <CalendarIcon /> */}
                    {/* <LinkIcon /> */}
                  </StyleAction>
                </AddressBox>
              ))}
            </StyleBox>
          )}
          {filterWalletWatched.length > 0 && (
            <StyleBox>
              <Text pb="10px">Watched</Text>
              {filterWalletWatched.map((w) => (
                <AddressBox key={w.address}>
                  <IconWrapper>
                    <WalletIcon />
                  </IconWrapper>
                  <Text onClick={() => handleChangeWallet(w.address)} style={{ cursor: 'pointer' }}>
                    {`${w.address.substring(0, 8)}...${w.address.substring(w.address.length - 6, w.address.length)}`}
                  </Text>
                  <StyleAction>
                    {/* <PencilIcon/> */}
                    {/* <CalendarIcon /> */}
                    {/* <LinkIcon /> */}
                  </StyleAction>
                </AddressBox>
              ))}
            </StyleBox>
          )}
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
