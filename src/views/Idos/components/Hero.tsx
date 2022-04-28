import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import axios from 'axios'
import { Box, Text, Flex } from 'luastarter-uikits'
import Container from 'components/layout/Container'
import useToast from 'hooks/useToast'
import { API_IDO_URL } from 'config'
import { EMAIL_REGEX } from 'config/constants/idos'

const StyledHero = styled.div`
  padding-bottom: 15px;
  padding-top: 15px;
  background-image: url('${process.env.PUBLIC_URL}/images/Group16.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 40px;
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
    border-color: #1a1a1a transparent transparent transparent;
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

const StyledInput = styled.input`
  height: 40px;
  outline: none;
  border: 1px solid #ffffff;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background: rgb(234 156 73);
  padding: 0 15px;
  min-width: 250px;
  color: #ffffff;
  &::placeholder {
    color: #ffffff;
  }

  @media (max-width: 576px) {
    min-width: 200px;
  }
`
const SubscribeButton = styled.button`
  height: 40px;
  color: #fabc46;
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  background-color: #ffffff;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 0 10px;
  border: 1px solid #ffffff;
  text-transform: uppercase;
  cursor: pointer;
  min-width: 100px;
`
const ErrorMessage = styled(Text)``

const StyledHeading = styled(Text)`
  font-family: 'Racing Sans One', cursive;
  font-size: 30px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 48px;
    line-height: 56px;
  }
`

const StyledText = styled(Text)`
  font-size: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
  }
`

const StyledFlex = styled(Flex)`
  @media (max-width: 576px) {
    flex-direction: column;
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

const Hero = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [address, setAddress] = useState(null)
  const { toastSuccess, toastError } = useToast()

  const handleChangeAddress = (e) => {
    setError(null)
    setAddress(e?.target?.value)
  }

  const onSubmit = async () => {
    try {
      if (!address) {
        setError('Please fill your email address')
        return
      }

      if (!EMAIL_REGEX.test(address)) {
        setError('Invalid email address')
        return
      }

      setIsLoading(true)
      await axios.post(`https://api.luaswap.org/api/luastarter/email/subscription`, {
        email: address,
      })
      setIsLoading(false)
      setAddress('')
      toastSuccess('Subscribed')
    } catch (e) {
      setIsLoading(false)
      toastError('Fail to subscribe')
    }
  }

  return (
    <Box mb="24px">
      <StyledHero>
        <Container>
          <StyledHeading mb="16px" textAlign="center" color="#FFFFFF">
            Decentralize your way of investing
          </StyledHeading>
          <StyledFlex alignItems="center" mt="20px" justifyContent="center">
            <StyledText bold textAlign="center" color="#FEF5E3" mr="16px">
              Subscribe to upcoming pools
            </StyledText>
            <Flex justifyContent="center">
              <Box>
                <StyledInput placeholder="Your email" value={address} type="email" onChange={handleChangeAddress} />
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
                <SubscribeButton onClick={onSubmit}>Subscribe</SubscribeButton>
              )}
            </Flex>
          </StyledFlex>
        </Container>
      </StyledHero>
    </Box>
  )
}

export default Hero
