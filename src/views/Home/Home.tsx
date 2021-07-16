import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { isEmpty } from 'lodash'
import { Heading, Text, BaseLayout, Progress, Flex, useModal, Box, Skeleton } from 'common-uikitstrungdao'

import { API_BLOCKFOLIO } from 'config'
import { useAppDispatch } from 'state'
import { useWallet } from 'state/hooks'
import { DataApiType } from 'state/types'
import { setWallet } from 'state/blockfolio'
import { useTranslation } from 'contexts/Localization'
import PageHeader from 'components/PageHeader'
import Page from 'components/layout/Page'
import CardValue from './components/CardValue'
import DataModal from './components/DataModal'
import NetworkModal from './components/NetworkModal'
import AddressManage from './components/AddressManage'
import InPutAddress from './components/InputAddress'
import WalletIcon from './components/Icon/WalletIcon'
import PoolIcon from './components/Icon/PoolIcon'
import AccountLoading from './components/Loading/AccountLoading'
import NetworkLoading from './components/Loading/NetworkLoading'
import Tier from '../../components/Tier'

const initialState: DataApiType = {
  totalInUSD: 0,
  tomochain: {
    tag: '',
    name: '',
    totalInUSD: '0',
    detailsHeader: [],
    details: [],
  },
  ethereum: {
    tag: '',
    name: '',
    totalInUSD: '0',
    detailsHeader: [],
    details: [],
  },
}
const initialNetwork = {
  tomochain: {
    balance: initialState.tomochain,
    liquidity: initialState.tomochain,
    luasafe: initialState.tomochain,
    masternode: initialState.tomochain,
  },
  ethereum: {
    balance: initialState.ethereum,
    liquidity: initialState.ethereum,
    luasafe: initialState.ethereum,
  },
}
const initialInUSD = {
  balance: 0,
  tomoNetwork: 0,
  ethNetwork: 0,
  tBalance: 0,
  tLiquidity: 0,
  tLuasafe: 0,
  tMasternode: 0,
  eBalance: 0,
  eLiquidity: 0,
  eLuasafe: 0,
}

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;
  @media (max-width: 575px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
const Card = styled.div`
  grid-column: span 4;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  cursor: pointer;
`
const FlexBox = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
`
const CardNetwork = styled.div`
  grid-column: span 6;
  width: 100%;
  padding-bottom: 20px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`
const FlexNetwork = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`
const Image = styled.img`
  max-width: 32px;
  margin-right: 10px;
`
const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  background-color: #fbf4bf;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  line-height: 30px;
  border-radius: 50px;
  font-size: 16px;
  margin-right: 10px;
`

const Home: React.FC = () => {
  const { account } = useWeb3React()
  const [dataWallet, setDataWallet] = useState<DataApiType>(initialState)
  const [dataLiquidity, setDataLiquidity] = useState<DataApiType>(initialState)
  const [dataLuasafe, setDataLuasafe] = useState<DataApiType>(initialState)
  const [dataLuafarm, setDataLuafarm] = useState<DataApiType>(initialState)
  const [dataMasternode, setDataMasternode] = useState<DataApiType>(initialState)
  const [dataNetwork, setDataNetwork] = useState(initialNetwork)
  const [dataInUSD, settotalInUSD] = useState(initialInUSD)
  const [isLoading, setIsLoading] = useState(false)

  const { wallets } = useWallet()
  const walletActived = Object.values(wallets).find((w) => w.isActive)
  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  useEffect(() => {
    if (account && isEmpty(wallets)) {
      const w = {
        address: account,
        isActive: true,
        isConnected: true,
      }
      dispatch(setWallet(w))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchBlockfolio = async (address: string) => {
      const tBalance = axios.get(`${API_BLOCKFOLIO}tomochain/balance/${address}`)
      const tLiquidity = axios.get(`${API_BLOCKFOLIO}tomochain/luaswapliquidity/${address}`)
      const tLuasafe = axios.get(`${API_BLOCKFOLIO}tomochain/luasafe/${address}`)
      const tLuafarm = axios.get(`${API_BLOCKFOLIO}tomochain/luafarm/${address}`)
      const tMasternode = axios.get(`${API_BLOCKFOLIO}tomochain/tomomaster/${address}`)

      const eBalance = axios.get(`${API_BLOCKFOLIO}ethereum/balance/${address}`)
      const eLiquidity = axios.get(`${API_BLOCKFOLIO}ethereum/luaswapliquidity/${address}`)
      const eLuasafe = axios.get(`${API_BLOCKFOLIO}ethereum/luasafe/${address}`)
      const eLuafarm = axios.get(`${API_BLOCKFOLIO}ethereum/luafarm/${address}`)

      setIsLoading(true)
      const [
        tBalanceResult,
        tLiquidityResult,
        tLuasafeResult,
        tLuafarmResult,
        tMasternodeResult,
        eBalanceResult,
        eLiquidityResult,
        eLuasafeResult,
        eLuafarmResult,
      ] = await Promise.all([
        tBalance,
        tLiquidity,
        tLuasafe,
        tLuafarm,
        tMasternode,
        eBalance,
        eLiquidity,
        eLuasafe,
        eLuafarm,
      ])
      setIsLoading(false)

      const eb = eBalanceResult.data.totalInUSD.replace(/,/g, '')
      const tb = tBalanceResult.data.totalInUSD.replace(/,/g, '')
      const eli = eLiquidityResult.data.totalInUSD.replace(/,/g, '')
      const tli = tLiquidityResult.data.totalInUSD.replace(/,/g, '')
      const elu = eLuasafeResult.data.totalInUSD.replace(/,/g, '')
      const tlu = tLuasafeResult.data.totalInUSD.replace(/,/g, '')
      const tma = tMasternodeResult.data.totalInUSD
      // const tfarm = tLuafarmResult.data.stakeAmount ? tLuafarmResult.data.stakeAmount : 0
      // const efarm = eLuafarmResult.data.stakeAmount ? eLuafarmResult.data.stakeAmount : 0

      const usdData = {
        balance:
          parseFloat(tb) +
          parseFloat(tli) +
          parseFloat(tlu) +
          parseFloat(eb) +
          parseFloat(eli) +
          parseFloat(elu) +
          parseFloat(tma),
        tomoNetwork: parseFloat(tb) + parseFloat(tli) + parseFloat(tlu) + parseFloat(tma),
        ethNetwork: parseFloat(eb) + parseFloat(eli) + parseFloat(elu),
        tBalance: parseFloat(tb),
        tLiquidity: parseFloat(tli),
        tLuasafe: parseFloat(tlu),
        // tLuafarm: parseFloat(tfarm),
        tMasternode: parseFloat(tma),
        eBalance: parseFloat(eb),
        eLiquidity: parseFloat(eli),
        eLuasafe: parseFloat(elu),
        // eLuafarm: parseFloat(efarm),
      }
      settotalInUSD(usdData)

      const wallet = {
        totalInUSD: parseFloat(eb) + parseFloat(tb),
        tomochain: tBalanceResult.data,
        ethereum: eBalanceResult.data,
      }
      setDataWallet(wallet)

      const liquidity = {
        totalInUSD: parseFloat(eli) + parseFloat(tli),
        tomochain: tLiquidityResult.data,
        ethereum: eLiquidityResult.data,
      }
      setDataLiquidity(liquidity)

      const luafarm = {
        totalInUSD: 0,
        tomochain: tLuafarmResult.data,
        ethereum: eLuafarmResult.data,
      }
      setDataLuafarm(luafarm)

      const luasafe = {
        totalInUSD: parseFloat(elu) + parseFloat(tlu),
        tomochain: tLuasafeResult.data,
        ethereum: eLuasafeResult.data,
      }
      setDataLuasafe(luasafe)

      const masternode = {
        totalInUSD: parseFloat(tma),
        tomochain: tMasternodeResult.data,
        ethereum: initialState.ethereum,
      }
      setDataMasternode(masternode)

      const network = {
        tomochain: {
          totalInUSD: parseFloat(tb) + parseFloat(tli) + parseFloat(tlu),
          balance: tBalanceResult.data,
          liquidity: tLiquidityResult.data,
          luasafe: tLuasafeResult.data,
          masternode: tMasternodeResult.data,
        },
        ethereum: {
          totalInUSD: parseFloat(eb) + parseFloat(eli) + parseFloat(elu),
          balance: eBalanceResult.data,
          liquidity: eLiquidityResult.data,
          luasafe: eLuasafeResult.data,
        },
      }
      // @ts-ignore
      setDataNetwork(network)
      // return { wallet, liquidity, luasafe, network }
    }

    if (walletActived) fetchBlockfolio(walletActived.address)
  }, [walletActived])
  const [onPresentWallet] = useModal(<DataModal data={dataWallet} />)
  const [onPresentLiquidity] = useModal(<DataModal data={dataLiquidity} />)
  const [onPresentLuasafe] = useModal(<DataModal data={dataLuasafe} />)
  const [onPresentLuafarm] = useModal(<DataModal data={dataLuafarm} />)

  const [onTomoWallet] = useModal(<NetworkModal data={dataNetwork.tomochain.balance} />)
  const [onTomoLiquidity] = useModal(<NetworkModal data={dataNetwork.tomochain.liquidity} />)
  const [onTomoLuasafe] = useModal(<NetworkModal data={dataNetwork.tomochain.luasafe} />)
  const [onTomoMasternode] = useModal(<NetworkModal data={dataNetwork.tomochain.masternode} />)

  const [onEthWallet] = useModal(<NetworkModal data={dataNetwork.ethereum.balance} />)
  const [onEthLiquidity] = useModal(<NetworkModal data={dataNetwork.ethereum.liquidity} />)
  const [onEthLuasafe] = useModal(<NetworkModal data={dataNetwork.ethereum.luasafe} />)

  return (
    <>
      <PageHeader>
        <Heading as="h1" scale="xl" mb="24px">
          Manage your assets and liabilities in one simple interface.
        </Heading>
        <Heading scale="lg" color="text">
          Get unique access to opportunities in open finance.
        </Heading>
      </PageHeader>

      <Page>
        {Object.keys(wallets).length > 0 || account ? (
          <>
            <Flex justifyContent="space-between">
              <div>
                {!isLoading ? <Text> Net Worth</Text> : <Skeleton width="80px" height="15px" />}
                {!isLoading ? (
                  <CardValue value={dataInUSD.balance} prefix="$" decimals={2} lineHeight="1.5" />
                ) : (
                  <Skeleton width="120px" height="30px" mt="20px" />
                )}
              </div>
              <AddressManage data={wallets} />
            </Flex>
            {!isLoading ? (
              <Text fontWeight="500" mb="18px" mt="50px" color="text" fontSize="20px">
                Account Overview
              </Text>
            ) : (
              <Skeleton width="150px" height="20px" mb="18px" mt="50px" />
            )}
            <Cards>
              {!isLoading ? (
                <Card onClick={onPresentWallet}>
                  <Flex alignItems="center">
                    <IconWrapper>
                      <WalletIcon />
                    </IconWrapper>
                    <Text> {t('Wallet')}</Text>
                  </Flex>
                  <CardValue value={dataWallet.totalInUSD} decimals={2} prefix="$" lineHeight="1.5" fontSize="20px" />
                </Card>
              ) : (
                <AccountLoading />
              )}
              {!isLoading ? (
                dataLiquidity.totalInUSD > 0 && (
                  <Card onClick={onPresentLiquidity}>
                    <Flex alignItems="center">
                      <IconWrapper>
                        <PoolIcon />
                      </IconWrapper>
                      <Text> {t('Liquidity Pool')} </Text>
                    </Flex>
                    <CardValue value={dataLiquidity.totalInUSD} decimals={2} lineHeight="1.5" fontSize="20px" />
                  </Card>
                )
              ) : (
                <AccountLoading />
              )}

              {!isLoading ? (
                dataLuasafe.totalInUSD > 0 && (
                  <Card onClick={onPresentLuasafe}>
                    <Flex alignItems="center">
                      <IconWrapper>
                        <PoolIcon />
                      </IconWrapper>
                      <Text> {t('LuaSafe')} </Text>
                    </Flex>
                    <CardValue
                      value={dataLuasafe.totalInUSD}
                      prefix="$"
                      decimals={2}
                      lineHeight="1.5"
                      fontSize="20px"
                    />
                  </Card>
                )
              ) : (
                <AccountLoading />
              )}
              {!isLoading ? (
                dataMasternode.totalInUSD > 0 && (
                  <Card onClick={onTomoMasternode}>
                    <Flex alignItems="center">
                      <IconWrapper>
                        <PoolIcon />
                      </IconWrapper>
                      <Text> {t('Masternode')} </Text>
                    </Flex>
                    <CardValue
                      value={dataMasternode.totalInUSD}
                      prefix="$"
                      decimals={2}
                      lineHeight="1.5"
                      fontSize="20px"
                    />
                  </Card>
                )
              ) : (
                <AccountLoading />
              )}
              {!isLoading ? (
                dataLuafarm && (
                  <Card onClick={onPresentLuafarm}>
                    <Flex alignItems="center">
                      <IconWrapper>
                        <PoolIcon />
                      </IconWrapper>
                      <Text> {t('LuaFarm')} </Text>
                    </Flex>
                    {/* <CardValue
                      value={dataLuafarm.totalInUSD}
                      prefix="LP"
                      position="after"
                      decimals={4}
                      lineHeight="1.5"
                      fontSize="20px"
                    /> */}
                  </Card>
                )
              ) : (
                <AccountLoading />
              )}
            </Cards>
            {!isLoading ? (
              (dataInUSD.ethNetwork > 0 || dataInUSD.tomoNetwork > 0) && (
                <>
                  <Text fontWeight="500" mb="18px" mt="50px" color="text" fontSize="20px">
                    {' '}
                    Network
                  </Text>
                  <Cards>
                    {dataInUSD.ethNetwork > 0 && (
                      <CardNetwork>
                        <FlexNetwork>
                          <Flex alignItems="center">
                            <Image src={`${process.env.PUBLIC_URL}/images/network/eth.png`} />
                            <Text> Ethereum</Text>
                          </Flex>
                          <CardValue
                            value={dataInUSD.ethNetwork}
                            decimals={2}
                            prefix="$"
                            lineHeight="1.5"
                            fontSize="20px"
                          />
                        </FlexNetwork>
                        <FlexBox>
                          {dataInUSD.eBalance > 0 && (
                            <Flex
                              onClick={onEthWallet}
                              justifyContent="space-between"
                              alignItems="center"
                              pt="10px"
                              pb="10px"
                            >
                              <Text>{t('Wallet')}</Text>
                              <Box width="400px" mr="20px" ml="20px">
                                <Progress
                                  variant="round"
                                  primaryStep={(dataInUSD.eBalance / dataInUSD.ethNetwork) * 100}
                                  scale="sm"
                                />
                              </Box>
                              <CardValue
                                value={(dataInUSD.eBalance / dataInUSD.ethNetwork) * 100}
                                decimals={0}
                                position="after"
                                prefix="%"
                                lineHeight="1.5"
                                fontSize="16px"
                                bold={false}
                              />
                            </Flex>
                          )}
                          {dataInUSD.eLiquidity > 0 && (
                            <Flex
                              onClick={onEthLiquidity}
                              justifyContent="space-between"
                              alignItems="center"
                              pt="10px"
                              pb="10px"
                            >
                              <Text>{t('Liquidity Pool')}</Text>
                              <Box width="400px" mr="20px" ml="20px">
                                <Progress
                                  variant="round"
                                  primaryStep={(dataInUSD.eLiquidity / dataInUSD.ethNetwork) * 100}
                                  scale="sm"
                                />
                              </Box>
                              <CardValue
                                value={dataInUSD.eLiquidity}
                                decimals={0}
                                position="after"
                                prefix="%"
                                lineHeight="1.5"
                                fontSize="16px"
                                bold={false}
                              />
                            </Flex>
                          )}
                          {dataInUSD.eLuasafe > 0 && (
                            <Flex
                              onClick={onEthLuasafe}
                              justifyContent="space-between"
                              alignItems="center"
                              pt="10px"
                              pb="10px"
                            >
                              <Text>{t('LuaSafe')}</Text>
                              <Box width="400px" mr="20px" ml="20px">
                                <Progress
                                  variant="round"
                                  primaryStep={(dataInUSD.eLuasafe / dataInUSD.ethNetwork) * 100}
                                  scale="sm"
                                />
                              </Box>
                              <CardValue
                                value={(dataInUSD.eLuasafe / dataInUSD.ethNetwork) * 100}
                                decimals={0}
                                position="after"
                                prefix="%"
                                lineHeight="1.5"
                                fontSize="16px"
                                bold={false}
                              />
                            </Flex>
                          )}
                        </FlexBox>
                      </CardNetwork>
                    )}
                    {dataInUSD.tomoNetwork > 0 && (
                      <CardNetwork>
                        <FlexNetwork>
                          <Flex alignItems="center">
                            <Image src={`${process.env.PUBLIC_URL}/images/network/tomochain.png`} />
                            <Text> TomoChain</Text>
                          </Flex>
                          <CardValue
                            value={dataInUSD.tomoNetwork}
                            decimals={2}
                            prefix="$"
                            lineHeight="1.5"
                            fontSize="20px"
                          />
                        </FlexNetwork>
                        <FlexBox>
                          {dataInUSD.tBalance > 0 && (
                            <Flex
                              onClick={onTomoWallet}
                              justifyContent="space-between"
                              alignItems="center"
                              pt="10px"
                              pb="10px"
                            >
                              <Text>{t('Wallet')}</Text>
                              <Box width="400px" mr="20px" ml="20px">
                                <Progress
                                  variant="round"
                                  primaryStep={(dataInUSD.tBalance / dataInUSD.tomoNetwork) * 100}
                                  scale="sm"
                                />
                              </Box>
                              <CardValue
                                value={(dataInUSD.tBalance / dataInUSD.tomoNetwork) * 100}
                                decimals={0}
                                position="after"
                                prefix="%"
                                lineHeight="1.5"
                                fontSize="16px"
                                bold={false}
                              />
                            </Flex>
                          )}
                          {dataInUSD.tLiquidity > 0 && (
                            <Flex
                              onClick={onTomoLiquidity}
                              justifyContent="space-between"
                              alignItems="center"
                              pt="10px"
                              pb="10px"
                            >
                              <Text>{t('Liquidity Pool')}</Text>
                              <Box width="400px" mr="20px" ml="20px">
                                <Progress
                                  variant="round"
                                  primaryStep={(dataInUSD.tLiquidity / dataInUSD.tomoNetwork) * 100}
                                  scale="sm"
                                />
                              </Box>
                              <CardValue
                                value={(dataInUSD.tLiquidity / dataInUSD.tomoNetwork) * 100}
                                decimals={0}
                                position="after"
                                prefix="%"
                                lineHeight="1.5"
                                fontSize="16px"
                                bold={false}
                              />
                            </Flex>
                          )}
                          {dataInUSD.tLuasafe > 0 && (
                            <Flex
                              onClick={onTomoLuasafe}
                              justifyContent="space-between"
                              alignItems="center"
                              pt="10px"
                              pb="10px"
                            >
                              <Text>{t('LuaSafe')}</Text>
                              <Box width="400px" mr="20px" ml="20px">
                                <Progress
                                  variant="round"
                                  primaryStep={(dataInUSD.tLuasafe / dataInUSD.tomoNetwork) * 100}
                                  scale="sm"
                                />
                              </Box>
                              <CardValue
                                value={(dataInUSD.tLuasafe / dataInUSD.tomoNetwork) * 100}
                                decimals={0}
                                position="after"
                                prefix="%"
                                lineHeight="1.5"
                                fontSize="16px"
                                bold={false}
                              />
                            </Flex>
                          )}
                          {dataInUSD.tMasternode > 0 && (
                            <Flex
                              onClick={onTomoMasternode}
                              justifyContent="space-between"
                              alignItems="center"
                              pt="10px"
                              pb="10px"
                            >
                              <Text>{t('Masternode')}</Text>
                              <Box width="400px" mr="20px" ml="20px">
                                <Progress
                                  variant="round"
                                  primaryStep={(dataInUSD.tMasternode / dataInUSD.tomoNetwork) * 100}
                                  scale="sm"
                                />
                              </Box>
                              <CardValue
                                value={(dataInUSD.tMasternode / dataInUSD.tomoNetwork) * 100}
                                decimals={0}
                                position="after"
                                prefix="%"
                                lineHeight="1.5"
                                fontSize="16px"
                                bold={false}
                              />
                            </Flex>
                          )}
                        </FlexBox>
                      </CardNetwork>
                    )}
                  </Cards>
                </>
              )
            ) : (
              <NetworkLoading />
            )}
          </>
        ) : (
          <InPutAddress />
        )}
      </Page>
    </>
  )
}

export default Home
