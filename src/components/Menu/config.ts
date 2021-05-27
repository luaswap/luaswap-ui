import { MenuEntry } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Exchange'),
    href: 'https://exchange.pancakeswap.finance/#/swap',
    icon: 'FarmIcon',
  },
  {
    label: t('Liquidity'),
    href: 'https://exchange.pancakeswap.finance/#/pool',
    icon: 'PoolIcon',
  },
  {
    label: t('LP Migration'),
    href: 'https://v1exchange.pancakeswap.finance/#/migrate',
    icon: 'PredictionsIcon',
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
]

export default config
