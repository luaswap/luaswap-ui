import React from 'react'
import styled from 'styled-components'
import { Box, Text } from 'common-uikitstrungdao'
import Container from 'components/layout/Container'
import { useTranslation } from 'contexts/Localization'

const StyledHero = styled.div`
  padding-bottom: 15px;
  padding-top: 15px;
  background: linear-gradient(107.27deg, #f5bd6d -12.7%, #d76700 122.45%),
    url('${process.env.PUBLIC_URL}/images/image7.png');
  border-radius: 40px;
`

const StyledHeading = styled(Text)`
  font-family: 'Racing Sans One', cursive;
`
const Hero = () => {
  const { t } = useTranslation()

  return (
    <Box mb="24px">
      <StyledHero>
        <Container>
          <StyledHeading fontSize="48px" mb="12px" textAlign="center" color="#FFFFFF">
            {t('Decentralize your way of investing')}
          </StyledHeading>
          <Text bold fontSize="32px" textAlign="center" color="#FEF5E3">
            {t('Subscribe to upcoming pools')}
          </Text>
        </Container>
      </StyledHero>
    </Box>
  )
}

export default Hero
