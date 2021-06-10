import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Luaswap',
  description:
    'Luawswap interface',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Luaswap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Luaswap')}`,
      }
    default:
      return null
  }
}
