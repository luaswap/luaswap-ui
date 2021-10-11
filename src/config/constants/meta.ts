import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'LuaSwap',
  description: 'LuawSwap Interface',
}

export const getCustomMeta = (path: string[], t: ContextApi['t']): PageMeta => {
  let routeName = '/'

  if (path.length !== 0) {
    routeName = path[0]
  }

  switch (routeName) {
    case '/':
      return {
        title: `${t('Home')} | ${t('LuaSwap')}`,
      }
    case 'farms':
      return {
        title: `${t('Farms')} | ${t('LuaSwap')}`,
      }
    case 'idos':
      return {
        title: `${t('Initial Dex Offering')} | ${t('LuaSwap')}`,
      }
    default:
      return null
  }
}
