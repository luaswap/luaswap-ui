import { MenuEntry } from 'common-uikitstrungdao'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Dashboard'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Farm'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Luastarter'),
    icon: 'IfoIcon',
    href: '/idos',
  },
  {
    label: t('Swap'),
    icon: 'TradeIcon',
    href: 'https://app.luaswap.org/#/swap',
  },
  {
    label: t('Pool'),
    icon: 'UnionIcon',
    href: 'https://app.luaswap.org/#/pool',
  },
]

export default config
