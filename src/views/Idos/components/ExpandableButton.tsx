import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, ChevronUpIcon, Text } from 'common-uikitstrungdao'

export interface ExpandableButton {
  onClick?: () => void
  expanded?: boolean
  disabled?: boolean
}

const Wrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  svg {
    fill: #fabc46;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  }
`

const ExpandableButton: React.FC<ExpandableButton> = ({ onClick, expanded, disabled }) => {
  return (
    <Wrapper
      aria-label="Hide or show expandable content"
      role="button"
      onClick={() => {
        if (!disabled) {
          onClick()
        }
      }}
      disabled={disabled}
    >
      <Text
        color="primary"
        bold
        style={{
          opacity: disabled ? 0.5 : 1,
        }}
      >
        Buy more
      </Text>
      {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Wrapper>
  )
}

ExpandableButton.defaultProps = {
  expanded: false,
}

export default ExpandableButton
