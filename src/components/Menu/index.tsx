import React, { useMemo, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu as UikitMenu } from 'luastarter-uikits'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import useLocationParams from 'hooks/useLocationParams'
import useLuaPrice from 'hooks/useLuaPrice'
import useEthBalance from 'hooks/useEthBalance'
import { useLuaContract } from 'hooks/useContract'
import { useProfile } from 'state/hooks'
import { unlockLuaStatus } from 'state/profile'
import { useAppDispatch } from 'state'
import { connectNetwork } from 'utils/wallet'
import config from './config'

const Menu = (props) => {
  const { account, chainId } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const dispatch = useAppDispatch()
  const luaPrice = useLuaPrice()
  const { profile, isUnlock } = useProfile()
  const luaContract = useLuaContract(chainId)
  const location = useLocation()
  const userEthBalance = useEthBalance()
  const { currentLanguage, setLanguage, t } = useTranslation()
  // const [queryChainId, updateLocation] = useLocationParams(location)

  const formatLuaPrice = useMemo(() => {
    if (luaPrice) {
      return luaPrice.div(10 ** 8).toNumber()
    }

    return 0
  }, [luaPrice])
  // useEffect(() => {
  //   if (queryChainId) {
  //     // const option = walletOptions.find(opts => opts.chainId === queryChainId)
  //     // connectNetwork(option)
  //     updateLocation()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [queryChainId, updateLocation, location.pathname])

  const unlockLua = useCallback(() => {
    if (luaContract) {
      luaContract.methods
        .unlock()
        .call()
        .then((res) => {
          dispatch(unlockLuaStatus(true))
        })
        .catch((err) => {
          dispatch(unlockLuaStatus(false))
          console.log(err, 'error')
        })
    }
  }, [luaContract, dispatch])
  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      connectNetwork={connectNetwork}
      accountData={profile}
      isUnlock={isUnlock}
      isDark
      chainId={chainId}
      // queryChainId={queryChainId}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      unlockLua={unlockLua}
      userEthBalance={userEthBalance}
      luaPriceUsd={formatLuaPrice}
      links={config(t)}
      profile={{}}
      {...props}
    />
  )
}

export default Menu
