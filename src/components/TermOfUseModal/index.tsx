import React, { useMemo, useState } from 'react'
import axios from 'axios'
import styled, { keyframes } from 'styled-components'
import { Modal, Text, Link, Flex, Box, useModal } from 'luastarter-uikits'
import { EMAIL_REGEX } from 'config/constants/idos'
import { API_IDO_URL } from 'config'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from 'hooks/useWeb3'
import useToast from 'hooks/useToast'

interface TermOfUseModalProps {
  onDismiss?: () => void
}

const StyledLink = styled.a`
  display: inline-block;
  color: #1990ff;
  font-weight: 700;
`
const roller = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const Label = styled.label`
  color: #c3c3c3;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
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
    border: 3px solid white;
    border-radius: 50%;
    animation: ${roller} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: white transparent transparent transparent;
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

interface StyledInputProps {
  error: string
}

const StyledInput = styled.input<StyledInputProps>`
  height: 40px;
  outline: none;
  border: 1px solid #c3c3c3;
  border-radius: 10px;
  background: #1a1a1a;
  padding: 0 15px;
  width: 100%;
  color: #c3c3c3;
  margin-bottom: ${(props) => (props.error ? '0px' : '10px')};
  &::placeholder {
    color: #c3c3c3;
  }
`
const SubscribeButton = styled.button`
  height: 40px;
  color: black;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  padding: 0 10px;
  background: transparent;
  text-transform: uppercase;
  background-color: #fbbb44;
  cursor: pointer;
  min-width: 100px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
const ErrorMessage = styled(Text)``

const TermOfUseModal: React.FC<TermOfUseModalProps> = ({ onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const { account, chainId } = useWeb3React()
  const { toastSuccess, toastError } = useToast()
  const web3 = useWeb3()
  const [error, setError] = useState(null)
  const [emailAddress, setEmailAddress] = useState(null)

  const disabledButton = useMemo(() => {
    if (!error && checked && emailAddress) {
      return false
    }

    return true
  }, [error, checked, emailAddress])

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
      let signedData = null
      if (chainId === 56) {
        const message = `0x${Buffer.from(emailAddress).toString('hex')}`
        signedData = await web3.eth.sign(message, account)
      } else {
        signedData = await web3.eth.personal.sign(emailAddress, account, null)
      }
      await axios.post(`${API_IDO_URL}/users/tou/`, {
        email: emailAddress,
        address: account,
        signature: signedData,
      })
      setIsLoading(false)
      setEmailAddress('')
      onDismiss()
    } catch (e) {
      console.log(e, 'error ?')
      toastError('Fail to submit')
      setIsLoading(false)
    }
  }

  return (
    <Modal title="Registration" hideCloseButton maxWidth="350px">
      <Text>
        Enter your email address to be automatically signed up for all the <br /> upcoming IDO pools.
      </Text>
      <Text bold mt="10px" mb="2px">
        Email
      </Text>
      <Box>
        <StyledInput
          placeholder="Your email"
          value={emailAddress}
          type="email"
          onChange={handleChangeAddress}
          error={error}
        />
        {error && (
          <ErrorMessage color="red" fontSize="12px" ml="5px" mt="5px">
            {error}
          </ErrorMessage>
        )}
      </Box>
      <Flex alignItems="center" mb="10px">
        <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.currentTarget.checked)} id="TOS" />
        <Label htmlFor="TOS">
          I have read and agree to the{' '}
          <StyledLink
            href="https://docs.tomochain.com/luaswap/luastarter/legal-information-and-notices#terms-of-use"
            target="_blank"
          >
            Terms of use
          </StyledLink>{' '}
          and{' '}
          <StyledLink
            href="https://docs.tomochain.com/luaswap/luastarter/legal-information-and-notices#privacy-policy"
            target="_blank"
          >
            Privacy policy
          </StyledLink>
        </Label>
      </Flex>
      {isLoading ? (
        <SubscribeButton>
          <Loader />
        </SubscribeButton>
      ) : (
        <SubscribeButton onClick={onSubmit} disabled={disabledButton}>
          I Agree
        </SubscribeButton>
      )}
    </Modal>
  )
}

export default TermOfUseModal
