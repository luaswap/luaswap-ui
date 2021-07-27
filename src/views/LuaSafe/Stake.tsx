import React, { useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Text, Card, CardBody, Button, useModal } from 'common-uikitstrungdao'

import { getLuaAddress } from '../../utils/addressHelpers'
import { getBalanceNumber } from '../../utils/formatBalance'
import useAllowanceStaking from '../../hooks/useAllowanceStaking'
import useApproveStaking from '../../hooks/useApproveStaking'
import useTokenBalance from '../../hooks/useTokenBalance'
import useEnter from '../../hooks/useEnter'
import Value from '../../components/Value'
import DepositModal from './DepositModal'

const CardHeader = styled.div`
  width: 100%;
`
const StakeLua: React.FC = () => {
  const { chainId } = useWeb3React()
  const tokenName = 'LUA'
  const [requestedApproval, setRequestedApproval] = useState(false)

  const allowance = useAllowanceStaking()
  const { onApprove } = useApproveStaking()
  const tokenBalance = useTokenBalance(getLuaAddress(chainId))
  const { onEnter } = useEnter()

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  const [onPresentDeposit] = useModal(<DepositModal max={tokenBalance} onConfirm={onEnter} tokenName={tokenName} />)

  return (
    <Card p="40px">
      <CardHeader>
        <Text pb="30px" fontSize="24px">
          {' '}
          YOUR LUA{' '}
        </Text>
        <Value value={getBalanceNumber(tokenBalance)} decimals={2} />
        <Text pt="5px"> LUA Tokens Available </Text>
      </CardHeader>
      <CardBody>
        {!allowance.toNumber() ? (
          <Button mt="8px" width="100%" disabled={requestedApproval} onClick={handleApprove}>
            Approve LUA
          </Button>
        ) : (
          <Button mt="8px" width="100%" disabled={tokenBalance.eq(new BigNumber(0))} onClick={onPresentDeposit}>
            Stake
          </Button>
        )}
      </CardBody>
    </Card>
  )
}

export default StakeLua
