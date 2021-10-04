import React from 'react'
import styled from 'styled-components'
import { Text, Button, Input, InputProps, Flex, Link, Box } from 'luastarter-uikits'
import { useTranslation } from 'contexts/Localization'

interface ModalInputProps {
  max: string
  min?: string
  symbol: string
  onSelectMax?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  value: string
  addLiquidityUrl?: string
  inputTitle?: string
  secondaryTitle?: string
  showWarning?: boolean
}

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  return theme.shadows.inset
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  border-radius: 16px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px 8px 0;
  width: 100%;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`

const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`

const ModalInput: React.FC<ModalInputProps> = ({
  max,
  min,
  symbol,
  onChange,
  onSelectMax,
  value,
  addLiquidityUrl,
  inputTitle,
  secondaryTitle = 'Balance',
  showWarning = true,
}) => {
  const { t } = useTranslation()
  const isBalanceZero = max === '0' || !max

  const displayBalance = (balance: string) => {
    if (isBalanceZero) {
      return '0'
    }
    const balanceNumber = Number(balance)
    if (balanceNumber > 0 && balanceNumber < 0.0001) {
      return balanceNumber.toLocaleString(undefined, { maximumFractionDigits: 20 })
    }
    return balanceNumber.toLocaleString()
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <StyledTokenInput isWarning={isBalanceZero && showWarning}>
        <Flex justifyContent="space-between" pl="16px">
          <Text fontSize="14px">{inputTitle}</Text>
          <Text fontSize="14px">{`${secondaryTitle}: ${displayBalance(max)}`}</Text>
        </Flex>
        <Flex alignItems="flex-end" justifyContent="space-between">
          <Box>
            <StyledInput
              pattern="^[0-9]*[.,]?[0-9]*$"
              inputMode="decimal"
              step="any"
              min={min}
              max={max}
              onChange={onChange}
              placeholder="0"
              value={value}
            />
          </Box>
          <Flex alignItems="center">
            <Button scale="sm" onClick={onSelectMax} mr="8px">
              {t('Max')}
            </Button>
            <Text fontSize="16px">{symbol}</Text>
          </Flex>
        </Flex>
      </StyledTokenInput>
      {isBalanceZero && addLiquidityUrl && (
        <StyledErrorMessage fontSize="14px" color="failure">
          {t('No tokens to stake')}:{' '}
          <Link fontSize="14px" bold={false} href={addLiquidityUrl} external color="failure">
            {t('Get %symbol%', { symbol })}
          </Link>
        </StyledErrorMessage>
      )}
    </div>
  )
}

export default ModalInput
