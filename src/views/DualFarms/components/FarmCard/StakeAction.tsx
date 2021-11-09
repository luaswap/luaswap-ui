import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal, Text } from 'luastarter-uikits'
import { useLocation } from 'react-router-dom'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import { getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'

export interface FarmWithStakedValue extends Farm {
  apr?: number
  reserves0?: string
  reserves1?: string
  totalSupply?: string
}
interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  addLiquidityUrl?: string
  master?: string
  farm: FarmWithStakedValue
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  farm,
  master,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()
  const { onStake } = useStake(pid, master)
  const { onUnstake } = useUnstake(pid, master)
  const location = useLocation()
  const { reserves0, reserves1, totalSupply, token2Symbol, tokenSymbol } = farm

  const displayBalance = useCallback(() => {
    const stakedBalanceNumber = getBalanceNumber(stakedBalance)
    if (stakedBalanceNumber > 0 && stakedBalanceNumber < 0.0001) {
      return getFullDisplayBalance(stakedBalance).toLocaleString()
    }
    return stakedBalanceNumber.toLocaleString()
  }, [stakedBalance])

  const calculatedAmount1 = useMemo(() => {
    return new BigNumber(reserves0)
      .multipliedBy(getBalanceAmount(stakedBalance))
      .dividedBy(totalSupply)
      .toNumber()
      .toFixed(2)
  }, [displayBalance])

  const calculatedAmount2 = useMemo(() => {
    return new BigNumber(reserves1)
      .multipliedBy(getBalanceAmount(stakedBalance))
      .dividedBy(totalSupply)
      .toNumber()
      .toFixed(2)
  }, [displayBalance])

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} addLiquidityUrl={addLiquidityUrl} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return stakedBalance.eq(0) ? (
      <Button
        onClick={onPresentDeposit}
        disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
      >
        {t('Stake LP')}
      </Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" width="14px" />
        </IconButton>
        <IconButton
          variant="tertiary"
          onClick={onPresentDeposit}
          disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
        >
          <AddIcon color="primary" width="14px" />
        </IconButton>
      </IconButtonWrapper>
    )
  }
  // (${calculatedAmount1} ${tokenSymbol?.symbol} + ${calculatedAmount2} ${
  //   token2Symbol?.symbol
  // })
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Heading color={stakedBalance.eq(0) ? 'textDisabled' : 'text'}>
        {stakedBalance.eq(0) ? (
          '0'
        ) : (
          <span>
            {displayBalance()}
            <span
              style={{
                fontSize: '15px',
              }}
            >
              &nbsp;({calculatedAmount1} {tokenSymbol?.symbol} + {calculatedAmount2} {token2Symbol?.symbol})
            </span>
          </span>
        )}
      </Heading>
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
