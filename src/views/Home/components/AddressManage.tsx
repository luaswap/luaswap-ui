import React, { useState, useRef } from "react"
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Input, Button, Flex, useModal, ChevronDownIcon } from 'common-uikitstrungdao'

// import { useWallet } from "state/hooks"
import useOnClickOutside from "hooks/useClickOutside"
import AddressModal from './AddressModal'
import WalletIcon from './Icon/WalletIcon'
import LinkIcon from './Icon/LinkIcon'
import CalendarIcon from './Icon/CalendarIcon'
import PencilIcon from './Icon/PencilIcon'



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
  background-color: #D9F9F0;
  color: #00D897;
  text-align: center;
  line-height: 30px;
  border-radius: 50px;
  font-size: 16px;
  margin-right: 10px;
`
const StyleAction = styled.div`
  display: flex;
  align-items: center;
  svg{
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    font-size: 30px;
    padding: 8px;
    margin-left: 10px;
    color: ${({ theme }) => theme.colors.text};
    :hover{
      background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    }
  }
`

const AddressManage: React.FC = () => {
    const ref = useRef()
    const [isOpen, setIsOpen] = useState(false)
    // const wallets = useWallet()
    // console.log(wallets)
    const watched = "0x63ca3de924fa6c9bd5c1e61bb787ae804d504490"
    const address = "0xe42BF6C707Ff70ADBCb5D3C41a18af9c7b59078d"
    const [onPresentAddress] = useModal(<AddressModal />)
    useOnClickOutside(ref, () => setIsOpen(false));
    return (
        <Flex position="relative">
            <StyleTextBox onClick={() => setIsOpen(!isOpen)}>
                <Text mr="10px">WalletManage</Text>
                <ChevronDownIcon />
            </StyleTextBox>
            {isOpen &&
                <StyleWalletManage ref={ref}>
                    <StyleBox>
                        <Text pb="10px">Connected</Text>
                        <AddressBox>
                            <IconWrapper>
                                <WalletIcon />
                            </IconWrapper>
                            <Text style={{ cursor: "pointer" }}>{`${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`}</Text>
                            <StyleAction>
                                <PencilIcon />
                                <CalendarIcon />
                                <LinkIcon />
                            </StyleAction>
                        </AddressBox>
                        <AddressBox>
                            <IconWrapper>
                                <WalletIcon />
                            </IconWrapper>
                            <Text>{`${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`}</Text>
                            <StyleAction>
                                <PencilIcon />
                                <CalendarIcon />
                                <LinkIcon />
                            </StyleAction>
                        </AddressBox>
                    </StyleBox>
                    <StyleBox>
                        <Text pb="10px">Watched</Text>
                        <AddressBox>
                            <IconWrapper>
                                <WalletIcon />
                            </IconWrapper>
                            <Text>{`${watched.substring(0, 6)}...${watched.substring(watched.length - 4, watched.length)}`}</Text>
                            <StyleAction>
                                <PencilIcon />
                                <CalendarIcon />
                                <LinkIcon />
                            </StyleAction>
                        </AddressBox>
                        <AddressBox>
                            <IconWrapper>
                                <WalletIcon />
                            </IconWrapper>
                            <Text>{`${watched.substring(0, 6)}...${watched.substring(watched.length - 4, watched.length)}`}</Text>
                            <StyleAction>
                                <PencilIcon />
                                <CalendarIcon />
                                <LinkIcon />
                            </StyleAction>
                        </AddressBox>
                    </StyleBox>
                    <Line />
                    <StyleBox style={{ cursor: "pointer" }} onClick={onPresentAddress}>
                        <Text>Manage Addresses</Text>
                    </StyleBox>
                    <StyleBox>
                        <Text>Network Settings</Text>
                    </StyleBox>
                </StyleWalletManage>
            }
        </Flex>
    )
}

export default AddressManage