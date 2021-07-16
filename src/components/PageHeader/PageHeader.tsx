import React from 'react'
import styled from 'styled-components'
import { Box } from 'common-uikitstrungdao'
import Container from '../layout/Container'

const Outer = styled(Box)<{ background?: string; isImage?: boolean }>`
  background: ${({ theme, background }) => background || theme.colors.gradients.bubblegum};
  ${({ isImage }) => (isImage ? 'background-size: cover;background-repeat: no-repeat;' : '')}
`

const Inner = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
`

const PageHeader: React.FC<{ background?: string; isImage?: boolean }> = ({
  background,
  isImage,
  children,
  ...props
}) => (
  <Outer background={background} isImage={isImage} {...props}>
    <Inner>{children}</Inner>
  </Outer>
)

export default PageHeader
