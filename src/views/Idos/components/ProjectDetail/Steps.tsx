import React from 'react'
import styled from 'styled-components'
import every from 'lodash/every'
import {
  Stepper,
  Step,
  StepStatus,
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  Link,
  OpenNewIcon,
} from 'common-uikitstrungdao'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { useTranslation } from 'contexts/Localization'
import Container from 'components/layout/Container'

const Wrapper = styled(Container)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
  padding-top: 48px;
  padding-bottom: 48px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: -24px;
    margin-right: -24px;
  }
`

const IfoSteps: React.FC = () => {
  const { t } = useTranslation()
  const stepsValidationStatus = [{}, {}, {}, {}]

  const getStatusProp = (index: number): StepStatus => {
    const arePreviousValid = index === 0 ? true : every(stepsValidationStatus.slice(0, index), Boolean)
    if (stepsValidationStatus[index]) {
      return arePreviousValid ? 'past' : 'future'
    }
    return arePreviousValid ? 'current' : 'future'
  }

  const renderCardBody = (step: number) => {
    const isStepValid = stepsValidationStatus[step]
    switch (step) {
      case 0:
        return (
          <CardBody>
            <Heading as="h4" color="primary" mb="16px">
              {t('Activate your Profile')}
            </Heading>
            <Text color="textSubtle" small mb="16px">
              {t('You will need to activate and register only one time to participate in all the IDO projects')}
            </Text>
            {isStepValid ? (
              <Text color="success" bold>
                {t('Profile Active!')}
              </Text>
            ) : (
              <Button as={Link} href="/profile">
                {t('Activate your Profile')}
              </Button>
            )}
          </CardBody>
        )
      case 1:
        return (
          <CardBody>
            <Heading as="h4" color="primary" mb="16px">
              {t('Guarantee your spot')}
            </Heading>
            <Text color="textSubtle" small>
              {t('Check your tier level here and secure your spot 72 hours before the IDO starts')} <br />
            </Text>
            <Button as={Link} external endIcon={<OpenNewIcon color="white" />} mt="16px">
              {t('Check your tier')}
            </Button>
          </CardBody>
        )
      case 2:
        return (
          <CardBody>
            <Heading as="h4" color="primary" mb="16px">
              {t('Execute your right')}
            </Heading>
            <Text color="textSubtle" small>
              {t(
                'When the IDO is live, you can execute your right to buy tokens. Please commit the amount between min and max value. If you are not in any of tiers, you may have change to participate',
              )}
            </Text>
          </CardBody>
        )
      case 3:
        return (
          <CardBody>
            <Heading as="h4" color="primary" mb="16px">
              {t('Claim your tokens')}
            </Heading>
            <Text color="textSubtle" small>
              {t(
                'When the IDO finishes, you can claim the tokens you bought, and any of unspent money will be returned to your wallet',
              )}{' '}
              <br />
            </Text>
          </CardBody>
        )
      default:
        return null
    }
  }

  return (
    <Wrapper>
      <Heading as="h2" scale="xl" mb="24px" textAlign="center">
        {t('How to "Luastarts"')}
      </Heading>
      <Stepper>
        {stepsValidationStatus.map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Step key={index} index={index} status={getStatusProp(index)}>
            <Card>{renderCardBody(index)}</Card>
          </Step>
        ))}
      </Stepper>
    </Wrapper>
  )
}

export default IfoSteps
