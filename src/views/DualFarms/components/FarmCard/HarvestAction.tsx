import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from 'luastarter-uikits'
import { useTranslation } from 'contexts/Localization'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'

interface FarmCardActionsProps {
  earnings?: BigNumber
  earningsLua?: BigNumber
  token?: string
  pid?: number
  master?: string
}

// TODO: Change value of the cakePrice here
const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, token, earningsLua, pid, master }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid, master)

  const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0
  const rawEarningsBalanceLua = account ? getBalanceNumber(earningsLua) : 0
  const displayBalance = rawEarningsBalance.toLocaleString()
  const displayBalanceLua = rawEarningsBalanceLua.toLocaleString()

  // const earningsBusd = rawEarningsBalance ? new BigNumber(rawEarningsBalance).multipliedBy(cakePrice).toNumber() : 0

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>
        {displayBalance} {token}
        {/* {earningsBusd > 0 && <CardBusdValue value={earningsBusd} />} */}
      </Heading>
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>
        {displayBalanceLua} LUA
        {/* {earningsBusd > 0 && <CardBusdValue value={earningsBusd} />} */}
      </Heading>
      <Button
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
      >
        {t('Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
