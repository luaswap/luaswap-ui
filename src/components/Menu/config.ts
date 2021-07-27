import { MenuEntry } from 'common-uikitstrungdao'
import { ContextApi } from '../../contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('LuaSafe'),
    icon: 'PoolIcon',
    href: '/luasafe',
  },
  {
    label: t('IDO'),
    icon: 'IfoIcon',
    href: '/idos',
  },
  {
    label: t('Exchange'),
    icon: 'TradeIcon',
    href: 'https://app.luaswap.org/#/swap',
  },
  {
    label: t('Liquidity'),
    icon: 'PredictionsIcon',
    href: 'https://app.luaswap.org/#/pool',
  },
]

export default config
