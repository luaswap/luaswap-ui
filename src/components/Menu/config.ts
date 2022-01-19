import { MenuEntry } from 'luastarter-uikits'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('LuaStarter'),
    icon: 'IfoIcon',
    href: '/ido',
  },
  {
    label: t('Portfolio'),
    icon: 'ListView',
    href: '/portfolio',
  },
  // {
  //   label: t('Farm'),
  //   icon: 'FarmIcon',
  //   href: 'https://app.luaswap.org/#/farming',
  //   isOpenNewTab: true,
  // },
  {
    label: t('Dual Farm'),
    icon: 'FarmIcon',
    href: '/dual-farm',
    isOpenNewTab: false,
  },
  {
    label: t('Swap'),
    icon: 'TradeIcon',
    href: 'https://app.luaswap.org/#/swap',
    isOpenNewTab: true,
  },
  // {
  //   label: t('Pool'),
  //   icon: 'UnionIcon',
  //   href: 'https://app.luaswap.org/#/pool',
  //   isOpenNewTab: true,
  // },
  // {
  //   label: t('LuaSafe'),
  //   icon: 'VaultIcon',
  //   href: 'https://app.luaswap.org/#/lua-safe',
  //   isOpenNewTab: true,
  // },
  // {
  //   label: t('Limit Order'),
  //   icon: 'OrderIcon',
  //   href: 'https://app.luaswap.org/orderbook/#/',
  //   isOpenNewTab: true,
  // },
  // {
  //   label: t('Charts'),
  //   icon: 'InfoIcon',
  //   href: '',
  //   isOpenNewTab: true,
  //   items: [
  //     {
  //       label: t('Ethereum'),
  //       href: 'https://info.luaswap.org/home',
  //     },
  //     {
  //       label: t('Tomochain'),
  //       href: 'https://info.luaswap.org/tomochain/home',
  //     },
  //   ],
  // },
]

export default config
