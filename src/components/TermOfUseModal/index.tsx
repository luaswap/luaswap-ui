import React, { useState } from 'react'
import axios from 'axios'
import styled, { keyframes } from 'styled-components'
import { Modal, Text, Link, Flex, Box } from 'luastarter-uikits'
import { EMAIL_REGEX } from 'config/constants/idos'
import { API_IDO_URL } from 'config'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from 'hooks/useWeb3'
import useToast from 'hooks/useToast'

interface TermOfUseModalProps {
  onDismiss?: () => void
}

const StyledLink = styled(Link)`
  display: inline-block;
`
const roller = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoaderIcon = styled.div`
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
  & > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    margin: 8px;
    border: 2px solid #1a1a1a;
    border-radius: 50%;
    animation: ${roller} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fabc46 transparent transparent transparent;
  }

  & > div:nth-child(1) {
    animation-delay: -0.45s;
  }

  & > div:nth-child(2) {
    animation-delay: -0.3s;
  }

  & > div:nth-child(3) {
    animation-delay: -0.15s;
  }
`

const Loader = () => {
  return (
    <LoaderIcon>
      <div />
      <div />
      <div />
      <div />
    </LoaderIcon>
  )
}

const StyledInput = styled.input`
  height: 40px;
  outline: none;
  border: 1px solid #1a1a1a;
  border-radius: 10px;
  background: rgb(234 156 73);
  padding: 0 15px;
  min-width: 250px;
  color: #1a1a1a;
  margin-right: 10px;

  &::placeholder {
    color: #1a1a1a;
  }
`
const SubscribeButton = styled.button`
  height: 40px;
  color: #fabc46;
  border-radius: 10px;
  padding: 0 10px;
  background: transparent;
  border: 1px solid #fabc46;
  text-transform: uppercase;
  cursor: pointer;
  min-width: 100px;
`
const ErrorMessage = styled(Text)``

const TermOfUseModal: React.FC<TermOfUseModalProps> = ({ onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { account } = useWeb3React()
  const { toastSuccess, toastError } = useToast()
  const web3 = useWeb3()
  const [error, setError] = useState(null)
  const [emailAddress, setEmailAddress] = useState(null)

  const handleChangeAddress = (e) => {
    setError(null)
    setEmailAddress(e?.target?.value)
  }

  const onSubmit = async () => {
    try {
      if (!emailAddress) {
        setError('Please fill your email address')
        return
      }
      if (!EMAIL_REGEX.test(emailAddress)) {
        setError('Invalid email address')
        return
      }
      setIsLoading(true)
      const signedData = await web3.eth.personal.sign(emailAddress, account, null)
      await axios.post(`${API_IDO_URL}/users/tou/`, {
        email: emailAddress,
        address: account,
        signature: signedData,
      })
      setIsLoading(false)
      setEmailAddress('')
      onDismiss()
    } catch (e) {
      setIsLoading(false)
    }
  }

  return (
    <Modal title="Term Of Use" hideCloseButton width="400px">
      <Text>
        <StyledLink href="https://docs.tomochain.com/luaswap/luastarter#terms-of-use" target="_blank">
          Terms of use
        </StyledLink>{' '}
        and{' '}
        <StyledLink href="https://docs.tomochain.com/luaswap/luastarter#terms-of-use" target="_blank">
          Privacy policy
        </StyledLink>
      </Text>
      <Flex justifyContent="center" mt="20px">
        <Box>
          <StyledInput placeholder="Your email" value={emailAddress} type="email" onChange={handleChangeAddress} />
          {error && (
            <ErrorMessage color="red" fontSize="12px" ml="5px" mt="5px">
              {error}
            </ErrorMessage>
          )}
        </Box>
        {isLoading ? (
          <SubscribeButton>
            <Loader />
          </SubscribeButton>
        ) : (
          <SubscribeButton onClick={onSubmit}>I Agree</SubscribeButton>
        )}
      </Flex>
    </Modal>
  )
}

export default TermOfUseModal
