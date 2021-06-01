import React, {useMemo} from 'react'
import { Menu as UikitMenu } from 'common-uikitstrungdao'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import useLuaPrice from 'hooks/useLuaPrice'
import { useProfile } from 'state/hooks'
import config from './config'

const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const luaPrice = useLuaPrice()
  const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()

  const formatLuaPrice = useMemo(() => {
    if (luaPrice) {
      return luaPrice.div(10 ** 8).toNumber()
    }

    return 0
  }, [luaPrice])

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      // @ts-ignore
      cakePriceUsd={formatLuaPrice}
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
