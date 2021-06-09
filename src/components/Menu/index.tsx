import React, { useMemo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu as UikitMenu, walletOptions } from 'common-uikitstrungdao'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import useLocationParams from 'hooks/useLocationParams'
import useLuaPrice from 'hooks/useLuaPrice'
import { useProfile } from 'state/hooks'
import { connectNetwork } from 'utils/wallet'
import config from './config'

const Menu = (props) => {
  const { account, chainId } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const luaPrice = useLuaPrice()
  const { profile } = useProfile()
  const location = useLocation()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const queryChainId = useLocationParams(location)

  const formatLuaPrice = useMemo(() => {
    if (luaPrice) {
      return luaPrice.div(10 ** 8).toNumber()
    }

    return 0
  }, [luaPrice])

  useEffect(() => {
    if (queryChainId) {
      const option = walletOptions.find(opts => opts.chainId === queryChainId)
      connectNetwork(option)
    }
  }, [queryChainId])

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      connectNetwork={connectNetwork}
      isDark={isDark}
      chainId={chainId}
      queryChainId={queryChainId}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      luaPriceUsd={formatLuaPrice}
      links={config(t)}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      {...props}
    />
  )
}

export default Menu
