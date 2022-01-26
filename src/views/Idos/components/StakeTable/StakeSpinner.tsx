import React from 'react'
import styled, { keyframes } from 'styled-components'

const spinning = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`

const Box = styled.div``

const Wrapper = styled(Box)<{ outerWidth?: string; innerWidth?: string; margin?: string }>`
  display: inline-block;
  position: relative;
  width: ${(props) => props.outerWidth};
  height: ${(props) => props.outerWidth};
  & > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${(props) => props.innerWidth};
    height: ${(props) => props.innerWidth};
    margin: ${(props) => props.margin};
    border: 4px solid #fff;
    border-radius: 50%;
    animation: ${spinning} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  & {
    div:nth-child(1) {
      animation-delay: -0.45s;
    }

    div:nth-child(2) {
      animation-delay: -0.3s;
    }

    div:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`

const LoaderIcon = ({ margin = '8px', innerWidth = '30px', outerWidth = '45px' }) => {
  return (
    <Wrapper margin={margin} innerWidth={innerWidth} outerWidth={outerWidth}>
      <Box />
      <Box />
      <Box />
      <Box />
    </Wrapper>
  )
}

export default LoaderIcon
