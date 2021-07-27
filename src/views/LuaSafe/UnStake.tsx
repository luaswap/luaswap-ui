import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Text, Card, CardBody, Button, Flex, useModal } from 'common-uikitstrungdao'
import { IsTomoChain } from '../../utils/wallet'
import { getBalanceNumber } from '../../utils/formatBalance'
import { getLuaAddress } from '../../utils/addressHelpers'
import useTokenBalance from '../../hooks/useTokenBalance'
import { useXluaContract } from '../../hooks/useContract'
import useLeave from '../../hooks/useLeave'
import Value from '../../components/Value'
import WithdrawModal from './WithdrawModal'

interface UnstakeXLuaProps {
  xLuaAddress: string
}

const CardHeader = styled.div`
  width: 100%;
`
const CardInsight = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 0px solid #e6dcd5;
  border-radius: 8px;
  box-sizing: border-box;
  background: transparent;
  color: #9e9e9e;
  font-size: 13px;
  text-align: center;
  line-height: 25px;
`
const UnstakeXLua: React.FC<UnstakeXLuaProps> = ({ xLuaAddress }) => {
  const { chainId } = useWeb3React()
  const IsTomo = IsTomoChain(chainId)
  const xLuaContract = useXluaContract(xLuaAddress)
  const myXLua = useTokenBalance(xLuaAddress)
  const totalLuaInSafe = useTokenBalance(getLuaAddress(chainId), xLuaAddress)
  const [totalSupplyXLua, setTotalSupplyXLua] = useState<BigNumber>(new BigNumber(0))
  const [pendingTx, setPendingTx] = useState(false)
  const trackingAPYBalanceXLua = useTokenBalance(xLuaAddress, '0xdEad000000000000000000000000000000000000')
  const trackingAPYBalanceXLuaTomo = useTokenBalance(xLuaAddress, '0x854f882771b61b26e91F8644dc0c9c94301FaD2d')
  // console.log(totalLuaInSafe, trackingAPYBalanceXLua, trackingAPYBalanceXLuaTomo)

  useEffect(() => {
    async function fetchTotalSupplyXLua() {
      try {
        const rawTotalSupply = await xLuaContract.methods.totalSupply().call()
        setTotalSupplyXLua(new BigNumber(rawTotalSupply))
      } catch (err) {
        console.error('[ERROR]:', err)
      }
    }
    fetchTotalSupplyXLua()
  }, [setTotalSupplyXLua, xLuaContract])

  const xLuaToLua = myXLua.multipliedBy(totalLuaInSafe).dividedBy(totalSupplyXLua)

  const trackingReward = IsTomo
    ? trackingAPYBalanceXLuaTomo
        .multipliedBy(totalLuaInSafe)
        .dividedBy(totalSupplyXLua)
        .minus(10 * 10 ** 18)
    : trackingAPYBalanceXLua
        .multipliedBy(totalLuaInSafe)
        .dividedBy(totalSupplyXLua)
        .minus(10 * 10 ** 18)

  const { onLeave } = useLeave()
  const tokenName = 'xLUA'
  const oneDay = 1000 * 60 * 60 * 24 // hours*minutes*seconds*milliseconds
  const initStakeAt = IsTomo ? new Date(1615349347000) : new Date(1603904400000)
  const toDay = new Date() // Today
  const differenceMs = Math.abs(toDay.getTime() - initStakeAt.getTime())
  const totalStakedDay = Math.round(differenceMs / oneDay)

  const [onPresentLeave] = useModal(<WithdrawModal max={myXLua} onConfirm={onLeave} tokenName={tokenName} />)

  return (
    <Card p="40px">
      <CardHeader>
        <Text pb="30px" fontSize="24px">
          YOUR xLUA
        </Text>
        <Value value={getBalanceNumber(myXLua)} decimals={2} />
        <Text pt="5px"> {`~ ${xLuaToLua.div(10 ** 18).toFixed(2)} LUA`} </Text>
      </CardHeader>
      <CardBody>
        <Button
          disabled={!myXLua.toNumber() || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onPresentLeave()
            setPendingTx(false)
          }}
          mt="8px"
          width="100%"
        >
          Unstake
        </Button>
        <CardInsight mt="30px" mb="10px">
          <Text>APY</Text>
          <Text color="#4caf50">
            {trackingReward
              ? `${parseFloat(
                  trackingReward
                    .div(totalStakedDay)
                    .div(10 * 10 ** 18)
                    .times(100)
                    .times(365)
                    .toFixed(2),
                ).toLocaleString('en-US')}%`
              : '~'}
          </Text>
        </CardInsight>
        <CardInsight>
          <Text>Unstake fee</Text>
          <Text color="#4caf50">0.5%</Text>
        </CardInsight>
      </CardBody>
    </Card>
  )
}

export default UnstakeXLua
