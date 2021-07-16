import { MenuEntry } from 'common-uikitstrungdao'
import { ContextApi } from 'contexts/Localization/types'

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
    label: t('IDO'),
    icon: 'IfoIcon',
    href: '/idos',
  },
]

export default config
