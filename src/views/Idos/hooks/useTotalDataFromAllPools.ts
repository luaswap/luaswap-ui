import useDeepMemo from 'hooks/useDeepMemo'
import { formatPoolDetail } from 'utils/formatPoolData'
import { FormatPool, Pool } from '../types'

const useTotalDataFromAllPools = (currentPoolData: Pool): FormatPool => {
  const data = useDeepMemo<FormatPool>(() => {
    const { img: _img, name: _name, description: _description, status: _status, index: _index } = currentPoolData
    const poolInfoChainId = Object.keys(_index).map((id) => {
      return formatPoolDetail(_index[id])
    })
    const totalPoolData = formatPoolDetail(poolInfoChainId)
    return {
      img: _img,
      name: _name,
      description: _description,
      status: _status,
      ...totalPoolData,
    }
  }, [currentPoolData])

  return data
}

export default useTotalDataFromAllPools
