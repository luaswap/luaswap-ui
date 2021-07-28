import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Box, Text, Flex } from 'common-uikitstrungdao'
import { selectUserTier } from 'state/profile'

interface DotProps {
  isVertical: boolean
}

const Wrapper = styled(Box)`
  align-items: center;
  justify-content: flex-start;
  padding: 24px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: #282828;
  height: 240px;
`
const MobileWrapper = styled(Box)`
  align-items: center;
  justify-content: flex-start;
  padding: 24px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: #282828;
`

const StepWrapper = styled(Flex)`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
`

const Step = styled(Box)`
  background-color: #fabc46;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin-right: 14px;
  border-radius: 50%;
`
const StepContainer = styled(Flex)`
  width: 25%;
`

const MobileStepWrapper = styled(Flex)`
  background-color: #1a1a1a;
  padding: 14px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
`

const Dot = styled(Box)<DotProps>`
  width: 3px;
  height: 3px;
  background-color: #e1a93f;
  border-radius: 50%;
  margin-right: ${(props) => (props.isVertical ? '0px' : '8px')};
  &:not(:last-of-type) {
    margin-bottom: ${(props) => (props.isVertical ? '8px' : '0px')};
  }
`
const DotsComponent = ({ numberOfDots, isVertical = false }) => {
  const dotArray = new Array(numberOfDots).fill(0)

  return (
    <Flex flexDirection={isVertical ? 'column' : 'row'}>
      {dotArray.map((_dot) => {
        return <Dot isVertical={isVertical} />
      })}
    </Flex>
  )
}

const IfoStepsDesktop = () => {
  return (
    <Wrapper>
      <StepWrapper>
        <StepContainer alignItems="center">
          <Step>
            <Text bold color="#353535">
              1
            </Text>
          </Step>
          <DotsComponent numberOfDots={27} />
        </StepContainer>
        <StepContainer alignItems="center">
          <Step>
            <Text bold color="#353535">
              2
            </Text>
          </Step>
          <DotsComponent numberOfDots={27} />
        </StepContainer>
        <StepContainer alignItems="center">
          <Step>
            <Text bold color="#353535">
              3
            </Text>
          </Step>
          <DotsComponent numberOfDots={27} />
        </StepContainer>
        <StepContainer alignItems="center">
          <Step>
            <Text bold color="#353535">
              4
            </Text>
          </Step>
        </StepContainer>
      </StepWrapper>
      <Flex>
        <Box width="25%">
          <Text bold color="#F6F6F6">
            Connect to your wallet
          </Text>
          <Text color="#8B8B8B">You will need to connect to your wallet to participate in all the IDO projects</Text>
        </Box>
        <Box width="25%">
          <Text bold color="#F6F6F6">
            Guarantee your spot
          </Text>
          <Text color="#8B8B8B">Buy more LUA or TOMO to have a better tier level</Text>
        </Box>
        <Box width="25%">
          <Text bold color="#F6F6F6">
            Your right
          </Text>
          <Text color="#8B8B8B">
            When the IDO is live, you can buy tokens. Please commit the amount between min and max value.
          </Text>
        </Box>
        <Box width="25%">
          <Text bold color="#F6F6F6">
            Claim your tokens
          </Text>
          <Text color="#8B8B8B">
            When the IDO finishes, you can claim the tokens you bought, and any of unspent money will be returned to
            your wallet
          </Text>
        </Box>
      </Flex>
    </Wrapper>
  )
}

const IfoStepsMobile = () => {
  return (
    <MobileWrapper>
      <MobileStepWrapper alignItems="center" justifyContent="center">
        <Step width="25%">
          <Text bold color="#353535">
            1
          </Text>
        </Step>
        <Box width="75%">
          <Text bold color="#F6F6F6">
            Connect to your wallet
          </Text>
          <Text color="#8B8B8B">You will need to connect to your wallet to participate in all the IDO projects</Text>
        </Box>
      </MobileStepWrapper>
      <Flex alignItems="center" justifyContent="center" mb="8px" mt="8px">
        <DotsComponent isVertical numberOfDots={10} />
      </Flex>
      <MobileStepWrapper alignItems="center" justifyContent="center">
        <Step width="25%">
          <Text bold color="#353535">
            2
          </Text>
        </Step>
        <Box width="75%">
          <Text bold color="#F6F6F6">
            Guarantee your spot
          </Text>
          <Text color="#8B8B8B">Buy more LUA or TOMO to have a better tier level</Text>
        </Box>
      </MobileStepWrapper>
      <Flex alignItems="center" justifyContent="center" mb="8px" mt="8px">
        <DotsComponent isVertical numberOfDots={10} />
      </Flex>
      <MobileStepWrapper alignItems="center" justifyContent="center">
        <Step width="25%">
          <Text bold color="#353535">
            3
          </Text>
        </Step>
        <Box width="75%">
          <Text bold color="#F6F6F6">
            Your right
          </Text>
          <Text color="#8B8B8B">
            When the IDO is live, you can buy tokens. Please commit the amount between min and max value.
          </Text>
        </Box>
      </MobileStepWrapper>
      <Flex alignItems="center" justifyContent="center" mb="8px" mt="8px">
        <DotsComponent isVertical numberOfDots={10} />
      </Flex>
      <MobileStepWrapper alignItems="center" justifyContent="center">
        <Step width="25%">
          <Text bold color="#353535">
            4
          </Text>
        </Step>
        <Box width="75%">
          <Text bold color="#F6F6F6">
            Claim your tokens
          </Text>
          <Text color="#8B8B8B">
            {' '}
            When the IDO finishes, you can claim the tokens you bought, and any of unspent money will be returned to
            your wallet
          </Text>
        </Box>
      </MobileStepWrapper>
    </MobileWrapper>
  )
}

const IfoSteps: React.FC = () => {
  const userTier = useSelector(selectUserTier)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  return isMobile ? <IfoStepsMobile /> : <IfoStepsDesktop />
}

export default IfoSteps
