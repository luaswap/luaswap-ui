import { useEffect } from 'react'
import useDeepMemo from 'hooks/useDeepMemo'
import { formatPoolDetail } from 'utils/formatPoolData'
import { IdoDetailInfo, Pool } from '../types'

/**
 * This hook calculate all tier pool's information
 */
const useTotalDataFromApi = (currentPoolData: Pool) => {
  const data = useDeepMemo<IdoDetailInfo>(() => {
    const { index: _index = {} } = currentPoolData
    const poolInfoChainId = Object.keys(_index).map((id) => {
      return formatPoolDetail(_index[id])
    })
    const totalPoolData = formatPoolDetail(poolInfoChainId)
    return {
      ...totalPoolData,
    }
  }, [currentPoolData])
  console.log(data, 'data ?')
  return data
}

export default useTotalDataFromApi
