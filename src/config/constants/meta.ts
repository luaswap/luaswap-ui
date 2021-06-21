import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Luaswap',
  description: 'Luawswap interface',
}

export const getCustomMeta = (path: string[], t: ContextApi['t']): PageMeta => {
  let routeName = '/'

  if (path.length !== 0) {
    routeName = path[0]
  }

  switch (routeName) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Luaswap')}`,
      }
    case 'farms':
      return {
        title: `${t('Farms')} | ${t('Luaswap')}`,
      }
    case 'idos':
      return {
        title: `${t('Initial Dex Offering')} | ${t('Luaswap')}`,
      }
    default:
      return null
  }
}
